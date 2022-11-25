<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Home</title>
    <link rel="stylesheet" href="css/bootstrap.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

</head>
<body>
<header>
    <nav id="navbar">
    <ul id="navlist">
        <li id="active"> <a href="index.jsp" id="current">Home</a></li>
    </ul>
        </nav>
</header>
<main>
    <h1>UCLL News</h1>
    <div class="grid">
        <table class="styled-table">
            <tbody id="items">

            </tbody>
        </table>
        <div id="feedback-form">
            <h2>Add your news items here
            </h2>
            <div>

                    <input type="text" id="NewsTitle" placeholder="Title"/>
                    <input type="text" id="NewsText" placeholder="Message"/>
                    <input type="text" id="NewsAuthor" placeholder="Author"/>
                    <button  type=button id="addnewsbutton">Add</button>

            </div>

        </div>
        <div class="mb-10">
            <h2>Search your comments here
            </h2>
            <div>

                <div class="formcomment">


                    <input class="Author" type="text" id="SearchAuthor" placeholder="Author"/>
                    <button class="button" type=button id="searchbutton">Zoek</button>

                </div>

            </div>

        </div>
        <div class="mb-5"  id="search">

        </div>
    </div>
</main>
<script type="text/javascript" src="js/news.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

</body>
</html>
