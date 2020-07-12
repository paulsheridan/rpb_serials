import pytest

from model_proxy.model_proxy import NativeDataProxy
from model_proxy.errors import ResourceNotFoundError, TableNotFoundError
from model_proxy.lookup_tables import (
    model,
    model_year,
    month_built,
    factory,
)

class TestModelProxy:
    def test_native_data_proxy_reads_from_lookup_tables(self):
        model_proxy = NativeDataProxy.from_model_name('model')
        value = model_proxy.read('R')
        assert value == 'RadRover'

    @pytest.mark.parametrize('table_name', ['model', 'model_year', 'month_built', 'factory'])
    def test_native_data_proxy_inits_with_dict_type_lookup_table(self, table_name):
        model_proxy = NativeDataProxy.from_model_name(table_name)
        assert isinstance(model_proxy.lookup_table, dict)

    def test_native_data_proxy_raises_tablenotfound_bad_table_name(self):
        with pytest.raises(TableNotFoundError):
            NativeDataProxy.from_model_name('bad_name')

    def test_native_data_raises_resourcenotfounderror_with_bad_key(self):
        model_proxy = NativeDataProxy.from_model_name('model')
        with pytest.raises(ResourceNotFoundError):
            model_proxy.read('X')