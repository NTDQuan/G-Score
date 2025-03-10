# G-Score
Nguyễn Trần Đình Quân - Python Intern

##Demo link

[https://g-score-ntdquan.netlify.app/](https://g-score-ntdquan.netlify.app/)

> [!IMPORTANT]
> The data fetching might take a couple minutes for the first time because of Render free-tier limitation (It need to rerun the backend service).If nothing happen please reload the page

# Guide to run the demo locally

You need to have docker installed 

Step 1: Clone the project

``` git clone git@github.com:NTDQuan/G-Score.git ```

Step 2: Change the autocrlf setting

> [!IMPORTANT]
> Need to do this because github auto convert all the endline to CRLF (window format) which can screw the .sh file in backend so we need to change it back to LF.

``` cd G-Score ```

``` git rm --cached -r . ``` # Don’t forget the dot at the end

``` git reset --hard ```

``` git status ```

Step 3: Open cmd and use
``` docker compose up ```

Step 3: Go to http://localhost:5173/

> [!IMPORTANT]
> The process might take a while to create the container and after that it need a couple minutes (~2 minutes) to seed the data (check the log for the progress)

# Demo video
https://github.com/user-attachments/assets/7c6275aa-ada7-4b4f-b2eb-bb7bc2343b65






