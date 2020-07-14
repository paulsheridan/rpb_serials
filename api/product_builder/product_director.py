class ProductDirector:

    def __init__(self, builder):
        self._builder = builder

    def create_product_from_key(self, serial_key):
        self._builder.set_product_model(serial_key['product_model'])
        self._builder.set_model_year(serial_key['model_year'])
        self._builder.set_production_month(serial_key['month_built'])
        self._builder.set_production_year(serial_key['year_built'])
        self._builder.set_factory(serial_key['factory'])
        self._builder.set_version(serial_key['version'])
        self._builder.set_unique_id(serial_key['unique_id'])
        return self._builder.get_product()
