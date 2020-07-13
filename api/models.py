from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


# Below are the simple models that would generate the needed
# lookup tables in a database. One of the primary benefits
# of abstraction is that the business logic doesn't have to
# know or care where the data comes from. I built the dictionaries
# inside api/model_proxy/lookup_tables to make testing easier,
# but for the initial iterations in a product like this, they
# work fine. And later on, if those tables needed to be mutable,
# model_proxy provides a fine interface for that access. Just
# add a new implementation that runs queries, add the models and a
# database, and you're done!

# class Model(db.Model):
#     code = db.Column(db.String(1), primary_key=True)
#     name = db.Column(db.String(20), unique=True)

# class MonthBuilt(db.Model):
#     code = db.Column(db.String(1), primary_key=True)
#     name = db.Column(db.String(10), unique=True)

# class ModelYear(db.Model):
#     code = db.Column(db.String(1), primary_key=True)
#     name = db.Column(db.String(10), unique=True)

# class Factory(db.Model):
#     code = db.Column(db.String(1), primary_key=True)
#     name = db.Column(db.String(20), unique=True)
