

import qrcode

url = "https://dokkuppnull.github.io/qr-game/"

qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)

qr.add_data(url)
qr.make(fit=True)

img = qr.make_image(
    fill_color=(139, 0, 0),      # Dark red QR
    back_color=(255, 182, 193)  # Light rose background
)

img.save("qr.png")