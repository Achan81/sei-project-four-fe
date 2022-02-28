
# <img src="https://i.imgur.com/xB9oxFs.png" width=100> GA SEI 60 Project Four - PAWHUB README

[Overview](#overview "Goto overview") |
[Brief](#brief "Goto brief") |
[Timeframe](#timeframe "Goto timeframe") |
[Technologies used](#technologies-used "Goto technologies used") |
[Deployment](#deployment "Goto deployment") |
[Approach](#approach "Goto approach") |
[Planning](#planning "Goto planning") |
[Work Split](#work-split "Goto work split") |
[Backend](#backend "Goto backend") |
[Seeding Data](#seeding-data "Goto seeding data") |
[Frontend](#frontend "Goto frontend") |
[Rehoming Info & Questionnaire page](#rehoming-info-&-questionnaire-page "Goto Rehoming Info & Questionnaire page") |


[Home Page](#home-page "Goto home page") |
[Challenges](#challenges "Goto challenges") |
[Wins](#wins "Goto wins") |
[Bugs](#bugs "Goto bugs") |
[Key Learnings](#key-learnings "Goto key-learnings") |
[Future Content and Improvements](#future-content-and-improvements "Goto future-content-and-improvements")

## Overview:
Pawhub is a full-stack app based on the Dog Trust website. The site features a gallery of dogs available for adoption. The backend was built using Django and Pythonm the frontend was React.js.
<br></br>
This was a one-week group project built in collaboration with [**Alex Theoklitou**](https://github.com/alextheoklitou), [**Joe Freeman**](https://github.com/joefreeman8) and [**Mike Salter**](https://github.com/Msalter91/). 

![wireframe](/src/assets/homepage.png)

## Brief:
* Build a full-stack application - by making your own backend and your own front-end
* Use an Express API to serve your data from the Mongo database
* Consume your API with a separate front-end built with React
* Create a MERN app & ensure there is CRUD functionality
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
* Have a visually impressive design
* Be deployed online so it's publicly accessible

## Timeframe:
* 1 week

## Technologies used:
* Frontend:\
React.js | JavaScript | Axios | CSS & Sass | Tailwind Framework | React-Hamburger 

* Backend:\
Python | Django | Insomnia

* Dev Tools:\
Git | GitHub | Miro | quickdatabasediagrams (ERD diagram)

## Deployment:
This app has been deployed on Netlify and can be found [**here**](https://pawhubz.netlify.app/ "here")


## Approach:
### Planning:
For this one week project we were given the opportunity to choose if we wanted to work in teams or work solo. The four of us had not collaborated together before, so we decided to work together for our final project. Our personal goal was to make a website that operated smoothly and allowed us to pull together all our skills build a beautiful multi functioning website. Cloning an App was also something we had never done before, so felt this would be a fun and interesting challenge.

After deciding on a clone app of a dog rehoming site, we firstly planned out our models 
using an [**ERD planner**](https://app.quickdatabasediagrams.com) and used this to visually display our model relationships in the backend.

![wireframe](/src/assets/wireframe.png)

We also use a virtual whiteboard (Miro) to collaboratively add to-do lists, add comments and sketch ideas on to one page.

![miro](/src/assets/miro.png)

## Work Split:
We split the roles of Backend and Frontend evenly so everybody played a full stack role on this project. During the project we were in constant communication with one another on Zoom and Slack. We scheduled daily morning stand-up sessions could talk about wins, discuss challenges, and plan the day ahead. 

Backend was done as a team, but each member took the lead on separate occasions, see Backend section below. 

For the Frontend, my primary focus covered the 'Donate', 'Rehoming information', 'Questionnaire' and 'How to adopt a dog' pages. Alex T, took on the 'Index' and 'Show' pages. Joe F built the 'Navbar', 'Routing' of the app, 'About Us', 'Who We Are', and 'Fundraiser' pages. Mike S, handled the 'Homepage', 'Newsletter' and 'footer' sections.

## Backend:

After the planning of models, we decided to focus fully on getting the backend built as soon as possible. We took turns to code whilst sharing screens, this allowed each of the team members to code review as we went along covering each section. Once each person had coded their part they would add, commit & push to a development branch. 

My Backend focus was on setting up the Register Auth model.
The below extract shows the registration form to complete when a user registers for the first time.

```js
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.CharField(max_length=50)
    preferred_breed_one = models.CharField(max_length=30)
    preferred_breed_two = models.CharField(max_length=30, null=True, blank=True)
    preferred_breed_three = models.CharField(max_length=30, null=True, blank=True)
    preferred_age = models.CharField(max_length=30)
    preferred_sex = models.CharField(max_length=30)
    has_dogs = models.BooleanField(default=False)
    has_cats = models.BooleanField(default=False)
    has_kids = models.BooleanField(default=False) 
```



My other focus was on JWT authentication when registering as shown below:
```js
from rest_framework import serializers
from django.contrib.auth import get_user_model
import django.contrib.auth.password_validation as validation
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError

from dogs.models import Dog, Favorite, Question

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, attrs):
        password = attrs.pop('password')
        password_confirmation = attrs.pop('password_confirmation')

        if password != password_confirmation:
            raise ValidationError({'detail':'Password and Confirmation do not match'})

        try:
            validation.validate_password(password=password)
        except ValidationError as err:
            raise ValidationError({'password': err})

        attrs['password'] = make_password(password)

        return attrs

    class Meta:
        model = User
        fields = '__all__'
```


### Seeding Data: 
We decided to pre-populate the website's dog database with single dogs data.  Seeding was a boring but important part of the process, we decided this would be done as a weekend homework to build data to add to the dogs seed. 

```js
{
  "model": "dogs.dog",
  "pk": 43,
  "fields": {
    "name": "Apache",
    "breed": "Siberian Husky",
    "age": "5 to 7 Years",
    "sex": "Male",
    "home_details": "Apache would like his own good sized private garden with 6ft solid fencing where he can relax and play to his heart's content! A home with breed experience is preferable for this characterful boy but if not then researching the breed and having knowledge is essential before applying.",
    "about": "Like a typical husky, Apache loves being outdoors exploring and sniffing and he would love an equally active home that can take him on adventures of hiking in the hills! It can take time for Apache to build a bond with you but patience and tasty treats are definitely a winning combination to this brilliant boy's heart. Once he knows you Apache enjoys a good stroke and a gentle fuss...on his terms of course!",
    "can_live_with_dogs": false,
    "can_live_with_cats": false,
    "can_live_with_kids": false,
    "date_added": "2022-01-09T12:10:41Z",
    "image_one": "https://imgur.com/pdoYuc5.jpg",
    "image_two": "https://imgur.com/7jAqlms.jpg",
    "image_three": "https://imgur.com/1Kt4PLT.jpg"
  }
},
```

## FrontEnd:
Once the backend was completed, we tested the backend would function by using  Insomnia. We then began to set-up the Frontend and link-up to the Backend. Working from our Miro planner, we set out to take on different pages to build away.

The main pages I built were:\
[**Rehoming info & Questionnaire**](https://pawhubz.netlify.app/rehomingform/)\
[**How to adopt a dog**](https://pawhubz.netlify.app/rehoming)\
[**Donate Now**](https://pawhubz.netlify.app/donation)

## Rehoming Info & Questionnaire page:
This was my first task, in cloning and recreating this page from the [**original**](https://forms.office.com/Pages/ResponsePage.aspx?id=CF91GvsdcUyzOIntd7Ndg-St0xtO4xxMmwbzNDsShYdURDdHTDlDN0tUMVdEWlhMUzQ2NzlRU0tBRCQlQCN0PWcu), we felt that the original page didn't really have any personality, so I was tasked with using the available information to recreate the page so that it would sit in better with the rest of the site.

The initial information was lifted from the original site, but laid out in a cleaner way. 
![rehoming](/src/assets/rehoming.png)

The questionnaire was selectively rebuilt for the purpose of our app, again laid out in a cleaner way (our version ended up with 29 questions, as opposed to the 60+ on original site).

![rehoming-questionnaire](/src/assets/rehoming-questionnaire.png)

Example code below for one of 29 questions...
```js
<fieldset>
<label htmlFor="text" className="block mb-0 text-sm font-medium text-gray-900">
18. Do you have visitors to your home?<span className="text-red-600"> *</span></label>
<p className="text-xs italic text-black mb-0">select all that apply</p>
  <div className="flex items-center mb-0">
    <input id="visitors-1" aria-describedby="visitors-1" type="checkbox" 
    className="cursor-pointer w-4 h-4 focus:outline-none transition duration-400 focus:ring-2 focus:ring-pawhub-yellow accent-pawhub-yellow"/>
    <label htmlFor="visitors-1" className="ml-3 text-sm font-medium text-gray-900">Adult visit most days</label>
  </div>

  <div className="flex items-center mb-0">
    <input id="visitors-2" aria-describedby="visitors-2" type="checkbox" 
    className="cursor-pointer w-4 h-4 focus:outline-none transition duration-400 focus:ring-2 focus:ring-pawhub-yellow accent-pawhub-yellow"/>
    <label htmlFor="visitors-2" className="ml-3 text-sm font-medium text-gray-900">Occasional adult visits</label>
  </div>

  <div className="flex items-center mb-0">
    <input id="visitors-3" aria-describedby="visitors-3" type="checkbox" 
    className="cursor-pointer w-4 h-4 focus:outline-none transition duration-400 focus:ring-2 focus:ring-pawhub-yellow accent-pawhub-yellow"/>
    <label htmlFor="visitors-3" className="ml-3 text-sm font-medium text-gray-900">Children under 11 years old visit most days</label>
  </div>

  <div className="flex items-center mb-0">
    <input id="visitors-4" aria-describedby="visitors-4" type="checkbox" 
    className="cursor-pointer w-4 h-4 focus:outline-none transition duration-400 focus:ring-2 focus:ring-pawhub-yellow accent-pawhub-yellow"/>
    <label htmlFor="visitors-4" className="ml-3 text-sm font-medium text-gray-900">Occasional visits from children under 11 years old</label>
  </div>

  <div className="flex items-center mb-0">
    <input id="visitors-5" aria-describedby="visitors-5" type="checkbox" 
    className="cursor-pointer w-4 h-4 focus:outline-none transition duration-400 focus:ring-2 focus:ring-pawhub-yellow accent-pawhub-yellow"/>
    <label htmlFor="visitors-5" className="ml-3 text-sm font-medium text-gray-900">Occasional visits from children aged 12-16 years old</label>
  </div>

  <div className="flex items-center mb-0">
    <input id="visitors-6" aria-describedby="visitors-6" type="checkbox" 
    className="cursor-pointer w-4 h-4 focus:outline-none transition duration-400 focus:ring-2 focus:ring-pawhub-yellow accent-pawhub-yellow"/>
    <label htmlFor="visitors-6" className="ml-3 text-sm font-medium text-gray-900">No Children visit</label>
  </div>
</fieldset>
```

## How to adopt a dog page:
This page serves as a information page to guide the user through the process of how to adopt a dog.

The [**original**](https://www.dogstrust.org.uk/rehoming/how-to-adopt) is similar to how I have built ours. Keeping within the scope of this project, we only chose to keep the relevant information for this page.
![adopt](/src/assets/adopt.png)


## Donate Now page:
The original website relies heavily on donations, so we wanted to include this feature within our app (note: our version does not have an end point for real payment).

The [**original**](https://www.dogstrust.org.uk/latest/latest-appeal/break-the-silence-cold) is similar to how I have built ours also. This page required different buttons to display different donation amounts to end up in the final amount. 
![donate](/src/assets/donate.png)


## Register / Login:
The traditional user UX of Register to Login sequence would normally be after successful registration, user would then be navigated to the Login page to enter details. This step has been simplified by allowing the user to automatically be logged in after registration. This is achieved by setting the login data into state. 

```js
 const handleChange = (e) => {
   setFormData({ ...formData, [e.target.name]: e.target.value })
   setFormErrors({ ...formErrors, [e.target.name]: '' })
   setLoginData({ username: e.target.name === 'username' ? e.target.value : formData.username, password: e.target.name === 'password' ? e.target.value : formData.password })
 }
 
 const handleSubmit = async (e) => {
   e.preventDefault()
   try {
     await registerUser(formData)
     const res = await loginUser(loginData)
     setToken(res.data.token)
     navigate('/')
   } catch (err) {
     setFormErrors(err.response.data)
   }
 }
 ```

## Filtering Dogs: 
The key functionality of the website is how to navigate through all the available dogs. Our filtering methods on PawHub enables the user to not only filter on an individual field, but they can also group these together for a more specific search. It is important to note that, this was made by possible by the initial planning of searchable categories covered at the Backend seeding stage. 
![filter](/src/assets/filter.png)
```js
const filteredDogs = (dogs) => {
   return dogs.filter(dog => {
     return (breed.includes(dog.breed) || breed.length === 0) &&
       (age.includes(dog.age) || age.length === 0) &&
       (dog.canLiveWithDogs && liveWith.includes('Dogs') || !liveWith.includes('Dogs')) &&
       (dog.canLiveWithCats && liveWith.includes('Cats') || !liveWith.includes('Cats')) &&
       (dog.canLiveWithKids && liveWith.includes('Children') || !liveWith.includes('Children'))
   })
 }
```

## Favouriting Dogs:
This function only exists for users who are registered and logged in. Once logged in, a purple heart tickable icon is visible next to selected dogs show page. Clicking the heart will add this dog to your favourites, which are accessible on the Profile page.
![heart](/src/assets/heart.png)
```js
 const handleFavorite = async () => {
   if (!isFavorited) {
     try {
       const res = await favoriteDog(dogId, favoriteObject)
       setIsFavorited(true)
       setFavoriteId(res.data.id)
     } catch (err) {
       console.log(err)
     }
   } else {
     try {
       await removeFavorite(dogId, favoriteId)
       setIsFavorited(false)
     } catch (err) {
       console.log(err)
     }
   }
 }
```

## Questions:
Another logged in only feature - whilst viewing a specific dog, the user is able to submit quesions directly.
![questions](/src/assets/questions.png)
```js
 const handleSubmit = async (e) => {
   e.preventDefault()
   try {
     await createQuestion(dogId, { content: question, dog: dogId, owner: userId })
     setQuestion('')
   } catch (err) {
     console.log(err)
   }
 }
```

## Error Handling:
The error handling on PawHub had a helpful hand with this because of [**httpstatusdogs.com**](httpstatusdogs.com) conveniently covered early on in our SEI course.

![error](/src/assets/error.png)
```js
import { ErrorImages } from '../../assets/errors/data'
 
function Error({ error }) {
 
 return (
   <section className="flex justify-center bg-black text-white">
     <div className="flex flex-col w-2/3 items-center" >
      
       {error < 500 ?
         <h2 className="gooddog-font text-3xl pt-5">There seems to have been an error...</h2> :
         <h2 className="gooddog-font text-3xl pt-5">It&apos;s not you, it&apos;s us...</h2>
       }
       <img className="object-center" src={ErrorImages[0][error]} />
     </div>
   </section>
 )
}
```

## About Us:
* Who We Are: a page dedicated to introducing the team
![whoweare](/src/assets/whoweare.png)

* Fundraiser: an information page based loosely on the original page
![fundraiser](/src/assets/fundraiser.png)

## Newsletter: 
A form to be contacted by Pawhub which is set up to send out an email to the email address submitted
![newsletter](/src/assets/newsletter.png)
![email](/src/assets/email.png)

## Profile:
This page is only available to logged in users and is specific to the userId. The page allows users favourited dogs to appear in one place. Also this page allows the deactivation of the account should they wish to leave.
![profile](/src/assets/profile.png)

## Challenges:
* Working with Tailwind for the first time, was scary for me. I thought I would pick it up quickly because of my limited experience with Bootstrap and Bulma, but I was wrong.  After spending time referencing the documentation I was able to build. 
* Working in a large team, I found that everyone working on different sections, whether Frontend or Backend was ont the easiest to keep on top of. Some changes made would not be noticable - which would hinder personal growth and understanding

## Bugs:
* Firefox & Safari doesn’t allow for the custom fonts to load, so Google Chrome is currently the preferred browser for viewing this app
* The carousel features sometimes break, causing the images to be lost

## Future Improvements:
* Bug fixes
* Create a “recommended for you” section, where the app finds dog’s similar to the users preferences and puts them forward
* Create a “give a dog up” section
* darkmode
* featured dog (to help promote a dog that needs a home asap) 
* success stories
* question submitted to add date/timestamp

## Wins & Key Learnings:
* This project reinforced the importance communication and collaboration when working within a team. 
* This final project allowed me to work with some great people who I hope will go on to have successful careers
* Taking on new frameworks for important projects is something I will avoid going forward (as learning a new frame work whilst trying to work towards a deadline is dangerous)
* The app is fully mobile responsive
* Testing the app over and over, we tested each page at every screen size from desktop to tablet to mobiles - important for any deployment


















## Update the Proxy Server

By default, the proxy server is set up to point at port 8000, if you need to do so update in `setupProxy.js` where commented.

## Using NPM

`npm run start` or `npm run dev`  to run the development server

`npm run build` to create a build directory

## Using Yarn

`yarn start` or `yarn dev`  to run the development server

`yarn build` to create a build directory

### ⚠️

To prevent the `failed-to-compile` issue for linter errors like `no-unsed-vars`, rename the `.env.example` to `.env` and restart your development server. Note this will only change the behaviour of certain linter errors to now be warnings, and is added just to allow your code to compile in development. These errors should still be fixed and other errors will still result in the code being unable to compile

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

