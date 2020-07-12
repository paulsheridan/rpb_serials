"""
My unit tests are more like integration tests for now.
"""

import pytest

from collections import OrderedDict

from product_builder.serial_number_parser import SerialNumberParser


DEFAULT_PATTERN_KEY = OrderedDict([
    ('model', 1),
    ('model_year', 1),
    ('month_built', 1),
    ('year_built', 2),
    ('factory', 1),
    ('version', 1),
    ('unique_id', 6),
])

test_data = [
    ('RB719F1000001', {'model': 'R', 'model_year': 'B', 'month_built': '7', 'year_built': '19', 'factory': 'F', 'version': '1', 'unique_id': '000001'}),
    ('HB918V1435684', {'model': 'H', 'model_year': 'B', 'month_built': '9', 'year_built': '18', 'factory': 'V', 'version': '1', 'unique_id': '435684'}),
    ('SA520F3123456', {'model': 'S', 'model_year': 'A', 'month_built': '5', 'year_built': '20', 'factory': 'F', 'version': '3', 'unique_id': '123456'}),
]

bad_data = [
    'RB719F100',
    'HB918V1435684',
    'SA520F3123456',
]

class TestDefaultPatternParser:
    def test_default_parser_initialized_with_dict_pattern_key(self):
        parser = SerialNumberParser(DEFAULT_PATTERN_KEY, 'RB719F1000001')
        assert parser.pattern_key == DEFAULT_PATTERN_KEY

    @pytest.mark.parametrize('serial, expected', test_data)
    def test_parser_returns_correct_value_when_called_with_good_data(self, serial, expected):
        parsed = {}
        serial_parser = SerialNumberParser(DEFAULT_PATTERN_KEY, serial)
        for result in serial_parser:
            parsed[result[0]] = result[1]
        assert parsed == expected
