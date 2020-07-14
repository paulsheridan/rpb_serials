from graphene import ObjectType, String, List, Schema, Field, Mutation
from flask_jwt_extended import (
    jwt_required,
    create_access_token,
    create_refresh_token,
)

from product_builder.serial_number_parser import SerialNumberParser
from product_builder.product_director import ProductDirector
from product_builder.product_builder import SerializedProductBuilder
from model_proxy.model_proxy import NativeDataProxy
from google_auth import google_user_from_token

class Product(ObjectType):
    serial = String()
    product_model = String()
    model_year = String()
    month_built = String()
    year_built = String()
    factory = String()
    version = String()
    unique_id = String()

class Query(ObjectType):
    products_from_serials = List(Product, serials=List(String))

    @jwt_required
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

class Token(ObjectType):
    access_token = String()
    refresh_token = String()

class TokenAuth(Mutation):
    class Arguments:
        id_token = String(required=True)

    token = Field(Token)

    def mutate(self, info, id_token):
        token = google_user_from_token(id_token)
        access_token = create_access_token(identity=token)
        refresh_token = create_refresh_token(identity=token)
        token['access_token'] = access_token
        token['refresh_token'] = refresh_token
        return TokenAuth(token=token)

class Mutation(ObjectType):
    token_auth = TokenAuth.Field()

schema = Schema(query=Query, mutation=Mutation)
