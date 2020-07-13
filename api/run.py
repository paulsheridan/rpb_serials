""" The main Flask application file that bootstraps and starts the app. """

import os

from flask_graphql import GraphQLView

from bootstrap import app_factory
# from api.schemas import schema

from graphene import ObjectType, String, List, Schema, Field

from product_builder.serial_number_parser import SerialNumberParser
from product_builder.product_director import ProductDirector
from product_builder.product_builder import SerializedProductBuilder
from model_proxy.model_proxy import NativeDataProxy


app = app_factory()

class Product(ObjectType):
    serial = String()
    model = String()
    model_year = String()
    month_built = String()
    year_built = String()
    factory = String()
    version = String()
    unique_id = String()

class Query(ObjectType):
    products_from_serials = List(Product, serials=List(String))

    def resolve_products_from_serials(parent, info, serials):
        products = []
        for serial in serials:
            parsed = {}
            serial_parser = SerialNumberParser(serial)
            for result in serial_parser:
                parsed[result[0]] = result[1]
            builder = ProductDirector(SerializedProductBuilder(NativeDataProxy))
            product = builder.create_product_from_key(parsed)
            product['serial'] = serial
            products.append(product)
        return products

schema = Schema(query=Query)


app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view(
        'graphql',
        schema=schema,
        graphiql=True,
    )
)


if __name__ == "__main__":
    app.run(debug=os.environ.get("FLASK_DEBUG", False))
