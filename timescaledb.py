import random
from datetime import datetime
import time
import json
import requests

query = """
mutation {
  insert_conditions (objects: [
    {
      time: "%s",
      location: "%s",
      temperature: %.2f,
      humidity: %.2f
    }
  ]) {
    affected_rows
  }
}
"""

url = 'http://localhost:8080/v1alpha1/graphql'
headers = {
    'x-hasura-access-key': 'mylongsecretkey '
}

location_choices = ['loc1', 'loc2', 'loc3', 'loc4', 'home', 'office']

def mk_query(cur_time, loc, temp, humid):
    q = query % (cur_time, loc, temp, humid)
    print(q)
    r = requests.post(url, data=json.dumps({'query': q}), headers=headers)
    print(r.text)

while True:
    temp = random.uniform(18.2, 39.89)
    humid = random.uniform(40.34, 92.87)
    loc = random.choice(location_choices)
    cur_time = datetime.now().isoformat()
    mk_query(cur_time, loc, temp, humid)
    time.sleep(0.5)