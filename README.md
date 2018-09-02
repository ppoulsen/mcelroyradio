# McElroy Radio

A site that requests the RSS feeds for several [McElroy Family of Podcasts](https://mcelroyshows.com/), shuffles the episodes into a never-ending playlist, and plays. Site is live at https://mcelroyrad.io. This project is in no way affiliated with the creators. They can be reached [here](https://mcelroyshows.com/contact/) and can be supported directly through [donations](https://maximumfun.org/donate) to their podcast network, Maximum Fun.

![Screenshot of mcelroyrad.io](https://github.com/ppoulsen/mcelroyradio/raw/master/.github/screenshot.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Install node >= 6 from https://nodejs.org/en/download/
Install yarn for package management https://yarnpkg.com/en/docs/install

### Installing

A step by step series of examples that tell you how to get a development env running

Clone the repository

```
git clone https://github.com/ppoulsen/mcelroyradio.git
```

Install dependencies in the client directory with `yarn`

```
cd client/
yarn
```

Run the development server! This will start it on http://localhost:3000

```
yarn start
```

## Deployment

For deployment, first build the bundled and optimized version of the site from the client directory.

```
cd client/
yarn build
```

This builds static files in the public/ directory that can be deployed anywhere. I use [now from zeit.co](https://zeit.co/now) from the public/ directory for easy deployment.

```
now
```

## Built With

* [create-react-app](https://github.com/facebook/create-react-app) - Create React apps with no build configuration
* [Node.js](https://nodejs.org/en/) - JavaScript Runtime
* [rss-parser](https://github.com/bobby-brennan/rss-parser#readme) - A small library for turning RSS XML feeds into JavaScript objects from [Bobby Brennan](http://bbrennan.info/)
* [yarn](https://yarnpkg.com/en/) - Dependency management
* [now](https://zeit.co/now) - Global serverless deployments

## Authors

* **Paul Poulsen** - *Initial work* - [ppoulsen](https://github.com/ppoulsen)

See also the list of [contributors](https://github.com/ppoulsen/mcelroyradio/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
