import gtfs_realtime_pb2
import requests

r = requests.get('http://api.511.org/transit/tripupdates?api_key=5aee2597-0f45-4c92-be53-4b5ce2a00498&agency=BA')
feed_message = gtfs_realtime_pb2.FeedMessage()
feed_message.ParseFromString(r.content)

print(feed_message.__str__())