$(document).ready(function () {

    /* Initialize variables. */
    var characterChooser = 0;

    var playerCharacter;
    var enemy;

    var attackButton = $("<button>");
    attackButton.addClass("btn btn-primary attackButton");
    attackButton.text("Attack!");

    var donaldTrump = {
        "attack": 25,
        "counter": 25,
        "health": 180
    }

    var sanders = {
        "attack": 25,
        "counter": 25,
        "health": 180
    }


    function selectCharacter(character) {
        playerCharacter = $('#' + character).detach();
        $("#gameSpace").append(playerCharacter);
        $('#' + character).children().append(attackButton);
    }

    function selectEnemy(character) {
        enemy = $('#' + character).detach();
        $("#enemySpace").append(enemy);
    }

    function attack() {

    }


    $(".cWrapper").on("click", function () {
        if (characterChooser == 0) {
            selectCharacter(this.id);
            characterChooser++;
            $("#toolTip").text("Choose an opponent!")
        } else {
            selectEnemy(this.id);
        }
        $('#' + this.id).removeClass("cWrapper");
        $('#' + this.id).children().removeClass("selectable");
    });

    $(".attackButton").on("click", function () {

    })



});
