[![Build status](https://ci.appveyor.com/api/projects/status/68faoc7f98fm0gpe/branch/master?svg=true)](https://ci.appveyor.com/project/Seaal/pug/branch/master)

# Pug
A Client for Jedi Knight Academy pick up games, currently in pre-alpha prototyping phase.

## Getting Started

To get started on developing the Pug project, you need to have the following installed:

* Visual Studio 2017 Community or better
* Node
* npm (Version 3+)
* Gulp (globally) - `npm install -g gulp`
* MongoDB (Version 3.4)

## Running

Run using Kestral (not iisexpress) in Visual Studio with the default port (5000). Visual studio will run `gulp build-dev` to handle compiling the frontend assets.

The project utilises browsersync to detect changes to front end assets and will automatically recompile and reload the changes. The port for browsersync is 3000 unless taken.
