# Event Search Application

## Overview
This project is an event search application that allows users to browse for events by artists, locations, or dates. Built with HTML, CSS, JavaScript, and Bootstrap, this application features a user-friendly interface for searching and displaying event information.

## Features
- **Search Functionality**
  - Users can search for events using keywords related to artists, locations, or dates.
  
- **Event List**
  - Displays a list of events matching the search criteria.
  - Each event includes a title, description, and venue information.

- **Attraction Panel**
  - Displays details about a specific attraction, including a title, image, and classification.

- **Responsive Design**
  - Utilizes Bootstrap for responsive design, ensuring the application works well on various devices and screen sizes.

- **Navigation**
  - Includes a navigation bar with links to the home page and the event search page.
  - Features a contact button for user inquiries.

- **Progress Bar**
  - A progress bar to indicate the loading state during searches.

## Code Structure
- **HTML**: The main structure of the application, including the search input, event list, and attraction panel.
- **CSS**: Custom styles for the application layout and design.
- **JavaScript**: Handles the search functionality and dynamic updates to the event list and attraction panel.

## State Management
- The application does not use a state management library but relies on JavaScript to handle the search input and update the DOM dynamically.

## Data Handling
- Event and attraction data are managed locally within the JavaScript code. The search functionality filters events based on the user's input.

## Potential Improvements
- Integrate with a real event API to fetch live event data.
- Implement user authentication and profile management.
- Enhance the UI/UX with additional interactive features and better styling.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
