# HawkHacks-2023
Hackathon at Montclair University
## Inspiration
       All computer science students and students in other intensive, difficult majors understand the feeling of impostor syndrome- feeling not good enough to be in your field, and too embarrassed to ask for help. Office hours might be daunting, interfere with other class times, or not always helpful. Not a lot of students are comfortable asking questions in class. Tutoring often requires you to sign up at the start of the semester, so what happens if you're doing well but suddenly can't seem to get one lecture topic down? Plus, I think we all know the feeling of our questions being left on read in a class group chat. 

The solution is something that's been there all along: creating a community for and by students, polling student understanding of a course lecture by lecture, topic by topic, and an extra-credit scheme to incentivize students to help each other. And so, we present: MyLecturePal. 

## What it doe
       MyLecturePal is a web application that allows a user (student) to sign in with their name, email, and  a password. Using a course ID, the user's list of courses and topics are immediately initialized upon setup. After signing in, the student's home page is displayed, with their courses, and topics underneath. After a lecture has been given, its corresponding topic is unlocked for rating. A student can rate the lecture from 1 to 5 based on their understanding. A student who rates the lecture highly is displayed a button called "Offer Help" to agree to help other students (with notes, answering questions, etc.), while a student who rates the lecture poorly is provided with a list of students' names and emails who have agreed to offer help. 

## How we built it
     Kusum was in charge of creating and managing the cluster (database) on Mongodb Atlas, along with doing the front-end work like radio buttons, sign up + login pages, background color, etc. Khushi was in charge of writing the back-end code, like User Models and Schemas, as well as endpoints and routes to connect the front-end and back-end. The front-end work was done in React js, HTML, CSS, and Javascript, while the back-end work was done in Express js, Node js, and Javascript. We wrote the code in Visual Studio Code and utilized a Git extension for version control. 

## Challenges we ran into
     As newbies to the MERN stack, it was very difficult to decipher errors, especially when error messages weren't that descriptive or specific. We often spent hours trying to fix minor problems, like not being able to create a new user because of a typo. There were a lot of problems with getting parts of the User model, like their arrays of courses and arrays of topics to save in the database, partly because of a problem in Schema structure. Connecting the front end to the back end also posed difficulties at times. 

## Accomplishments that we're proud of
      Considering that we aren't very familiar with the MERN stack, and that one of us only learned how to use Git version control today, we are surprised and proud that we were able to fulfill most of our plan for MyLecturePal within the 24 hour timeframe. It is a working web application with clean, neat, UI that has the components we planned, like the login and signup page, the display of courses and topics, the ability to rate those topics, radio buttons that pop up correctly, etc. 

## What we learned
     We became more familiar with Mongodb Atlas database management, along with how to decipher errors. We additionally learned how to resolve errors and how to identify what caused them: if a certain problem is a front-end or back-end issue. We learned how to change and organize Schema structure in a way that fits our model's purposes. 

## What's next for MyLecturePal
     Although our team is proud of what we have achieved, there are lots of things that we wanted to add. For presentation and time-saving purposes, there is only one course displayed in the student homepage while realistically, they would have 4-5, so we would accommodate that in the future. The topics are supposed to unlock after reaching the day of the lecture, but we ran out of time to finish the corresponding code, so in the current version of MyLecturePal, all lecture topics are always unlocked, giving the potential problem of students rating lectures they haven't even attended. In the future, we want to accommodate multiple courses, fix the unlocking/locking of courses, spruce up the UI by adding topic descriptions and more, as well as exploring adding admin access to a professor, who can see lecture ratings. 
