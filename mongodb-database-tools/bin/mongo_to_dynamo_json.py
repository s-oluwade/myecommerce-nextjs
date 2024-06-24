import json

def convert_to_dynamodb_json(mongo_json):
    dynamodb_json = []
    for item in mongo_json:
        dynamodb_item = {}
        for key, value in item.items():
            dynamodb_item[key] = convert_value(value)
        dynamodb_json.append(dynamodb_item)
    return dynamodb_json

def convert_value(value):
    if isinstance(value, str):
        return {"S": value}
    elif isinstance(value, int):
        return {"N": str(value)}
    elif isinstance(value, float):
        return {"N": str(value)}
    elif isinstance(value, list):
        return {"L": [convert_value(v) for v in value]}
    elif isinstance(value, dict):
        return {"M": {k: convert_value(v) for k, v in value.items()}}
    elif value is None:
        return {"NULL": True}
    else:
        raise TypeError(f"Unsupported data type: {type(value)}")

# Load MongoDB JSON
with open('ecommerce_products.json', 'r') as f:
    mongo_json = json.load(f)

# Convert to DynamoDB JSON
dynamodb_json = convert_to_dynamodb_json(mongo_json)

# Save DynamoDB JSON
with open('dynamodb_output.json', 'w') as f:
    json.dump(dynamodb_json, f, indent=4)