# Meme Generator API for Serverless Cloud

This is an simple and cool app example for [Serverless Cloud](https://www.serverless.com/cloud).

With this API you can generate and store image file of this meme easily.

## Forking Project

[Fork this app on Serverless Cloud](https://cloud.serverless.com/calganaygun/meme-generator-serverless)

If you forked this app in Serverless Cloud, you have to set a parameter named `MAX_AGE_IN_DAYS`. It is live time for uploaded images. 

## API Usage

```
/?image<background_image_url>&
top=<top_text>&
bottom=<bottom_text>&
upload (optional gives a download url to meme which stores in a S3 bucket)
```

## Test it
You can check my examples:

Generating example [https://serverless-meme-generator.calgan.cloud/generate?top=I%27m%20in%20ur%20cloud&bottom=creating%20ur%20memes&image=https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Cat_on_laptop_-_Just_Browsing.jpg/800px-Cat_on_laptop_-_Just_Browsing.jpg](https://serverless-meme-generator.calgan.cloud/generate?top=I%27m%20in%20ur%20cloud&bottom=creating%20ur%20memes&image=https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Cat_on_laptop_-_Just_Browsing.jpg/800px-Cat_on_laptop_-_Just_Browsing.jpg)

Generating and storing example [https://serverless-meme-generator.calgan.cloud/generate?top=I%27m%20in%20ur%20cloud&bottom=creating%20ur%20memes&image=https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Cat_on_laptop_-_Just_Browsing.jpg/800px-Cat_on_laptop_-_Just_Browsing.jpg&upload](https://serverless-meme-generator.calgan.cloud/generate?top=I%27m%20in%20ur%20cloud&bottom=creating%20ur%20memes&image=https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Cat_on_laptop_-_Just_Browsing.jpg/800px-Cat_on_laptop_-_Just_Browsing.jpg&upload)