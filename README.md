# Pilotage Data Search

Pilotage Data Search is a website to show vessel pilotage data, designed for truck drivers to analyse rough wait time of previous services

## Table of Contents

- [Description](#description)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Assumptions](#assumptions)

## Description

This project is a web-based application designed to assist truck drivers predict the rough wait time. It tracks, calculates, and displays service times of recent pilotage moments. As a result, drivers can be as efficient as possible in delivering their last mile deliveries.

## Technologies Used

- **React** (for the frontend UI)
- **TypeScript** (for type safety)
- **CSS** (for styling)

## Installation

Follow the steps below to get the project up and running on your local machine.

#### Clone the repository:

```bash
git clone https://github.com/Michael-Santoso/pilotage.git
```

#### Navigate into the project directory:

```bash
cd pilotage
```

#### Install dependencies:

```bash
npm install
```

#### Run the project:

```bash
npm start
```

## Usage

Once the application is running, you can interact with it by:

- **Searching IMO number**: The search bar finds the data for a specific IMO number, completed with if-checks.
- **Reading data table**: This table presents service data including log times, service requested time, vehicle arrival time, pilot arrival time, actual service time, total time and idle time.
- **Viewing overall total**: The application calculates the overall time at the bottom.

## Assumptions

There are some assumptions made for this application:

- The time is shown in **24 hour time format**. Seconds are also ignored in this case due to (1) less significance in bigger picture and (2) API showing same seconds for all time data.
- The data is shown in **chronological order**, from start until the end.
- Since the table displays only past data of services, truck drivers are **assumed to be able to predict** their most efficient route for their last mile deliveries from these data.
- The column **Log Time (SGT)** displays the time after all the data has succesfully logged into the system (not showing NULL values). This is to reflect the overall process flow, showing the time when the data entry for a specific record becomes fully completed.
- The column **Idle Time (Between Services)** displays the time between each service. In the case of first service, the value is set to "-".

Through these assumptions, here are our thought process of the applications logical flow:

- The column **Total Time** shows the time from when the service is requested until when the service has ended. This helps truck drivers estimate the service time.
- The column **Idle Time (Between Services)** shows the time in-between service to estimate the duration when they have arrived at anchorages/pilot boarding ground.
- The last **Overall Total** shows the time taken for the whole process of requesting service, whole service process, and idle time as well. Obviously, when the items are moving between more places, the time shown tends to be longer. However, the **Total of Total Time and Idle Time** can show the proportion of time taken by the respective factor, allowing the drivers to optimize their route planning.

Overall, we hope that the application is able to assist truck drivers optimize their route planning to the best of their ability. Through these past data, they can roughly estimate how long each process take, then find the best planning for their current/future route timing.
