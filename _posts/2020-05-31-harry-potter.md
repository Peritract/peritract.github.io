---
title: Harry Potter and the accessing of APIs
---

APIs are everywhere. They're a core element of modern software/services, and an incredibly powerful tool for developers. Learning how to use and access APIs unlocks an incredible number of possibilities with code.

This post explains what an API is and how to connect to one using Python, aiming to give an accessible introduction to a topic that can be bewildering to explore. It's designed for people who already have some experience with Python and are now looking to expand their skillset. Both for my own amusement, and because it's helpful to have an example to make concepts concrete, the post is structured around the [Harry Potter API](https://www.potterapi.com/).

## Code

This tutorial was written using using Jupyter notebooks & Python 3.7.5; things might behave slightly differently if you're in a different IDE or using different versions of the language.

You can find a complete copy of the code for this tutorial [on Github](https://github.com/peritract/tutorials).

## What is an API?

An API (**A**pplication **P**rogramming **I**nterface) is a service that provides data when asked for it. There are more specific and complex definitions, but that one is sufficient most of the time. APIs are designed to allow different machines and programs to speak to each other through code; there doesn't need to be a human in between. Most modern APIs use the [HTTP(S)](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) protocol to communicate.

APIs are everywhere - you can get [weather APIs](https://openweathermap.org/api), which allow you to get data on the weather. There are [Canadian football APIs](http://api.cfl.ca/), which provide data on Canadian football. There are APIs that will give you [love](http://www.loveaas.com/) or [hate](https://foaas.com/) or [placeholder images of kittens](https://placekitten.com/).

Many APIs charge for access, but many allow either totally free access, or have several usage tiers so that you can experiment for free, but would be charged if - like many new tech companies - you wanted to build an entire business on top of existing APIs.

Everyone who uses the internet interacts with APIs every day - any time you see an interactive map, or see a list of products on a website, an API is probably being used in the background. Many modern organisations and companies are built on top of APIs provided by other organisations, and may provide APIs themselves. In short, APIs are everywhere.

By connecting to different APIs, you can dramatically increase the power and scope of the software that you build; you don't need to independently map the world, or obsessively track the weather: using APIs, you can connect to services that are already doing that, building your awesome idea on top of existing structures.

## Accessing an API

There are two main pieces of information you need when attempting to use an API:

1. Where to find the API (the **endpoint**)

2. How to make the request

### API endpoints

In order to request data from an API, you need to know where to send the request. An address that an API provides for people to make requests is called an **endpoint**. Some APIs have just one endpoint, responding to only one type of request. More usually, an API will have several different endpoints, each one allowing you to request different information.

The Harry Potter API has a base address - `https://www.potterapi.com/v1/` and then several endpoints that extend from there. If you want, for example, to get a random Hogwarts house, you can use the sorting hat endpoint - `sortinghat` to make that request. The full address for the sorting hat endpoint is `https://www.potterapi.com/v1/sortinghat`.

Because APIs communicate using HTTPS, the endpoint is a valid web address - or [URL](https://www.lifewire.com/what-is-a-url-2626035) - that you can access. Visiting that address will show you a randomly-chosen Hogwarts house.

[Access the Harry Potter API sorting hat endpoint.](https://www.potterapi.com/v1/sortinghat)

### API calls

In its simplest form, an API request is just the address of an API endpoint. Making an API call is when you access - or "hit" - an endpoint with a request.

The link above lets you hit the `sortinghat` endpoint manually. From a human point of view, you click the link and visit another site. What's actually happening is that - when you click the link - your browser makes a request to the API endpoint, which gives back the data in [JSON format](https://www.json.org/json-en.html), which your browser then displays for you. Most of the time, we don't need to think about the requests going back and forth across the internet, but it's helpful to be aware of them when talking about APIs.

Not all requests are so simple. Some API endpoints listen out for extra information in requests, and return different data depending on the **parameters** you provide. Some endpoints require **authentication**, and will only return data to requests which contain a secret API key. We'll look at both of those further on.

### API documentation

Although many APIs work in very similar ways, you'll always need to do a bit of research to work out exactly what the endpoints for a particular API are, or how requests should be formatted. Luckily, most APIs come with detailed documentation, including example requests and the data they would return.

The [Harry Potter API's documentation](https://www.potterapi.com/) explains what each endpoint is for, and how to use it.

## Accessing an API using Python

While it is possible to just visit API endpoints as a human user, it's not really what they're for. APIs are designed to be accessed using code, from within programs. We'll look now at how to use Python to access the `sortinghat` api endpoint.

### Importing libraries

We only need one library to access the Harry Potter API. `requests` allows us to make HTTPS requests through Python.

```python
import requests  # Make calls to web API endpoints
```

### Creating the URL

The next step is to craft the URL - the actual address to request data from.

Although we could just store the URL as one string for this request, it's both good practice, and useful for later, to first create the different bits of the URL and then connect them together. This makes it easier to edit this URL and create new ones in the future.

```python
# Create the URL components

base_url = "https://www.potterapi.com/v1/"

endpoint_url = "sortinghat"

# Join the pieces together

url = base_url + endpoint_url

# View the url

print(url)

```

> [https://www.potterapi.com/v1/sortinghat](https://www.potterapi.com/v1/sortinghat)

### Making the request

Once the URL has been created, we can use the `.get()` method in the `requests` library to ask the API for the data. There are other types of requests that we could use, but mostly, when dealing with APIs, you'll use GET requests: the HTTPS request that asks for information.

```python
# Make a request - accio data

response = requests.get(url)
```

In response to our request, we get (appropriately enough) a `response` object. This not only contains our data, but also key information about the request and how it was received.

All `response` objects have an HTTP **status code**. This is a 3-digit number that tells you if the request was successful and, if it wasn't successful, what went wrong. You are probably already familiar with some status codes, such as **404**: the status code for when a requested resource could not be found. There are many [different codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status), each one with a different meaning.

The status code for a successful request with no problems is **200**.

```python
# Check the status code of the response object

print(response.status_code)
```

> 200

### Getting the data

Lastly, we need to actually extract the data from the `response` object. As already mentioned, the API returns data in [JSON format](https://www.json.org/json-en.html). JSON stands for **J**ava **S**cript **O**bject **N**otation, and it is one of the most popular data formats in the world. It's a relatively lightweight format, it's human-readable, and it's easy to work with using most programming languages.

The `response` object has a built-in method, `.json()`, that extracts the data from JSON format and returns it as the most appropriate Python data structure. In our current case, that's just a `str`.

```python
# Access the data

data = response.json()

# View the data

print(data)
```

> Slytherin

## Authentication

Many APIs require you to provide user credentials to access their data. This allows them to manage traffic, control server costs, charge for access, and understand how the API is actually being used.

As a general rule, these credentials take the form of an **API key** - a long string of letters and numbers that identifies a request as coming from a particular user. When making the request, you attach your API key.

### Getting an API key

The Harry Potter API doesn't require authorisation to access the `sortinghat` endpoint, but it is required for any of the other endpoints. You can get a free key from the API by [creating an account](https://www.potterapi.com/login/#signup) with a valid email.

Once you've created an account, you'll be given your unique key.

---

**API keys should be kept private and secure - don't share your keys with anyone.**

**In the cell below, I've replaced my actual key with a placeholder string.**

---

```python
# Store the API key as a variable.

HP_API_KEY = "XXXXXXXXXXXXXXXXXX"
```

### Making a request with an API key

We can use the API key to make requests to a different endpoint - the `spells` endpoint.

The first step here is similar to our earlier API call: we construct the URL from a base component and and endpoint component. 

```python
# Construct the required URL pieces
# base_url already exits

endpoint_url = "spells"

# Construct the URL

url = base_url + endpoint_url

# View the URL

print(url)
```

> [https://www.potterapi.com/v1/spells](https://www.potterapi.com/v1/spells)

If you attempt to visit the URL at the moment though, you'll get this response:

```
"error": "Must pass API key for request"
```

We need to add the API key onto the request in order to authenticate it. However, it's not as simple as just sticking it onto the end - the API will think it's part of the actual URL and we'll end up requesting data from an endpoint that doesn't exist. Instead, we need to add it as a **parameter**.

###  Parameters

Parameters - also called "query parameters" - are the extra pieces of pieces of information that the API is listening for. Each parameter has a name and a value, and they're attached onto the URL with a special syntax so that the API knows how to interpret them.

Later on, we'll use several different parameters at once, but for this call, we just need one: the **key** parameter.

```python
# Add the parameter onto the URL

url = url + "?key=" + HP_API_KEY

# Display the URL

print(url)
```

> https://www.potterapi.com/v1/spells?key=XXXXXXXXXXXXXXXXXX

Because I've replaced my API key with a placeholder, the link above won't work. With a real API key though, it would give you the data.

The "?" tells the API to stop reading the URL as an address from that point on, and start looking for parameters. Next comes the name of the parameter - `key` - followed by an equals sign and then the actual value. In this case, I've replaced the real value with a fake one, for security reasons.

When the API receives this request, it will start by identifying the address part of the URL, and directing it towards the right endpoint. Then it will extract any parameters it finds, matching the names of parameters it will accept to the names in the URL.

```python
# Send the request

response = requests.get(url)

# Check the response code

print(response.status_code)
```

A response of 200 means that the server has accepted the API request and that the API key is valid.

## Extracting the data

The `spells` endpoint is a bit more complex than `sortinghat` and returns more data. In order to extract meaningful information, we'll have to go through a few more steps.

The start is the same - we can access the data using `.json()`.

```python
# Access the data

data = response.json()

# Check the type of the data

print(type(data))
```

> <class 'list'>

The response this time has given us a list - we'll need to loop through it to get at the spell details.

Let's start by looking at just the first item in the list.

```python
# Check the type of the first list item

print(type(data[0]))
```

> <class 'dict'>

```python
# Print out the first item

print(data[0])
```

> {'_id': '5b74ebd5fb6fc0739646754c', 'spell': 'Aberto', 'type': 'Charm', 'effect': 'opens objects'}

Each item in the list is a dictionary of `key:value` pairs. Now that we understand the structure of the data, we can actually access the data we requested.

Because `.json()` converts everything into Python objects, anything that you would normally do with Python is an option. With just a little more code, we can get the total number of spells:

```python
# Print the number of spells

print(len(data))
```

> 151

We could also extract the spell names from the list.

```
# Loop through the first five items of the list, printing out the name of each spell.

for item in data[:5]:
    print(item["spell"])
```

> Aberto
> Accio
> Age Line
> Aguamenti
> Alarte Ascendare

And - in a slightly more complex example - we can count spells by type.

```python
# Count up each type of spell
spell_counts = {}

for item in data:
    if item["type"] not in spell_counts:
        spell_counts[item["type"]] = 1
    else:
        spell_counts[item["type"]] += 1
        
for key in spell_counts:
    print(key + ":", spell_counts[key])
```

> Charm: 40
> Enchantment: 1
> Spell: 92
> Hex: 1
> Curse: 15
> Jinx: 2

The API calls get the data into your program; you can then do whatever you want with it.

## Parameters

`key` is a required parameter for all the endpoints except `sortinghat`, but it's not the only one available. By consulting the [documentation](https://www.potterapi.com/), you can learn which API endpoints accept which query parameters.

You can use parameters to filter the data, returning only a subset of the available data. To explore this, we'll use the `characters` endpoint, which accepts several different parameters.

### Accessing characters

```python
# Construct the url

endpoint_url = "characters"

url = base_url + endpoint_url + "?key=" + HP_API_KEY

# Request all character data

response = requests.get(url)

# Check the response status

print(response.status_code)
```

> 200

```python
# Extract the data

data = response.json()

# Count the number of characters

print(len(data))
```

> 195

### Adding more parameters

In order to add more parameters, filtering the data, we add them onto the end of the URL. "&" is used to connect the different parameters together.

```python
# Add another parameter onto the url

url = url + "&deathEater=True"

# Request character data on characters who are Death Eaters

response = requests.get(url)

# Check the response status

print(response.status_code)
```

> 200

```python
# Extract the data

data = response.json()

# Count the Death Eaters

print(len(data))
```

> 24

You can combine parameters in any way you want, filtering the data to whatever degree you need. The query below, for example, requests information on all the pure-blood wizards who work at the Ministry of Magic .

```python
# Craft the URL

url = base_url + endpoint_url + \
      "?key=" + HP_API_KEY + \
      "&bloodStatus=pure-blood&ministryOfMagic=True"

# Hit the endpoint

response = requests.get(url)

# Count the wizards

print(len(response.json()))
```

> 6

## Conclusions

There's an awful lot more complexity to APIs that is worth exploring; hopefully this post has made some of the key ideas clear and given you a springboard from which to investigate further.

One of the best ways to build your skills & understanding is to find an API you're interested in and just start playing around with it. Different APIs will have their own rules and documentation, but the broad principles are very similar: hit an endpoint to make a request, include parameters to be more specific. As APIs want you to use them, the documentation is normally quite clear and accessible. 

[This GitHub repository](https://github.com/public-apis/public-apis) holds a large list of publicly-accessible APIs for you to play with. Go explore & experiment, and if you have any questions or find something interesting, please do [let me know](https://github.com/peritract).

[A world of dreams and adventure awaits you](https://pokeapi.co/).