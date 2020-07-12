"""
The Model Proxy abstracts the act of querying database lookup tables for serial
code information. This maintains proper dependency inversion, but also allows me
to use anything I want in place of the database, including simple in-memory models
for testing and prototyping. The proxy is very simple, since most of its functionaltiy
will be reading.
"""

import abc
from importlib import import_module

from model_proxy.errors import ResourceNotFoundError, TableNotFoundError

class ModelProxy(abc.ABC):
    @abc.abstractmethod
    def read(self, serial_code):
        pass

    @abc.abstractclassmethod
    def from_model_name(cls, model_name):
        pass


class NativeDataProxy(ModelProxy):
    """A concrete implementation of the ModelProxy API that wraps a dictionary for
        any application model"""

    def __init__(self, lookup_table):
        self.lookup_table = lookup_table

    def read(self, serial_code):
        """Returns a string for an individual product attribute, such as model, month produced, etc.

        Args:
            serial_code: - The serial code of the field name to retrieve.

        Returns:
            A string meaningful string of the serial code given.
        """
        try:
            return self.lookup_table[serial_code]
        except KeyError:
            raise ResourceNotFoundError

    @classmethod
    def from_model_name(cls, model_name):
        """A simple factory that provides an instance of any of
        the lookup table dictionaries consuming a string
        version of the model class name
        """

        try:
            model_module = import_module('model_proxy.lookup_tables')
            lookup_table = getattr(model_module, model_name)

        except (IndexError, AttributeError):
            raise TableNotFoundError(
                '{} not found!'.format('model_proxy.lookup_tables' + model_name))

        return cls(lookup_table)
