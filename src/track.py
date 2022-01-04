from flask.blueprints import Blueprint
from flask import request, render_template
import requests


URL = 'https://bps.bringer.dev/public/api/v2/get/parcel/tracking.json?tracking_number='
default = 'BPS65O4WYLBWWBR'
bp = Blueprint('track', __name__)


@bp.route('/', methods=['GET', 'POST'])
def home():
	if request.method == 'GET':
		return render_template('track/search.html')
	elif request.method == 'POST':
		tracking_number = request.form.get('tracking_number')

		if tracking_number == '':
			tracking_number = default

		if tracking_number is not None:
			res = requests.get(URL + tracking_number)
			tracking_info = res.json()

			return render_template('track/shipment.html', shipment=tracking_info)