# CineFinder - Group Project

## Project Overview

This project aims to solve a problem or create an experience using key topics from the CPAN 144 course. It will incorporate component-based architecture, state management, routing, styling, API integration, and deployment.

## Core Features

The project will include a list of main features and functionalities that demonstrate an understanding of key concepts such as state management and API integration.

## Overview of Components, Routes, and State Management

### Components

* **Footer component**
Show the copyright symbol and the website name at the bottom of every page. The style is also set to match the rest of the website. This makes it look clean and consistent.
* **Navbar component**
This stays at the top of every page and lets users switch between pages dynamically to make it run smoothly.
* **SearchBar component**
We have this on the homepage as its own component so it's easy to update when we add the search feature to it. It’s used to allow users to search movies/shows to then show the results in the Movie List page.

### Routes

Set up in the navbar to handle navigation between homepage, MovieDetail and MovieList pages. Uses dynamic routing to make the transition from pages smooth and fast.

### State Management Structure

Our project uses two methods for state management: we use useState for a component's local data, such as form inputs. For data that needs to be shared across many components, we use the React Context API to avoid passing the same data through many layers of components, making state easier to manage.

## Technology Stack

* **Frontend**: Next.js, React
* **Styling**: CSS Modules, Styled Components, SASS (examples from proposal, specific tools may vary)
* **APIs**: Integration with described APIs to be used in the project
* **Third-party Services**: Any third-party services or libraries will be mentioned here

## Roles and Responsibilities

Each team member has a distinct role in the project. This includes:

* Frontend development
* State management and component logic
* Styling and UI/UX design
* API integration and data handling
