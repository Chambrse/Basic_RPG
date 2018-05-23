$(document).ready(function () {

    /* Initialize variables. */
    var characterChooser = true;
    var playerCharacterDiv;
    var enemyDiv;

    /* create and store attack button */
    var attackButton = $("<button>");
    attackButton.addClass("btn btn-primary attackButton");
    attackButton.text("Attack!");

    /* Character objects */
    var donaldTrump = {
        attack: 25,
        counter: 25,
        health: 180
    }

    var sanders = {
        attack: 25,
        counter: 25,
        health: 180
    }

    var kellyanne = {
        attack: 25,
        counter: 25,
        health: 180
    }

    /* Character select functions */
    function selectCharacter(character) {
        /* Store the character */
        playerCharacter = character;
        /* remove the character card and move it to game space */
        playerCharacterDiv = $('#' + character).detach();
        $("#gameSpace").append(playerCharacterDiv);
        /* add the attackbutton and corresponding event listener */
        $('#' + character).after(attackButton);
    }


    function selectEnemy(character) {
        enemy = character;
        enemyDiv = $('#' + character).detach();
        $("#enemySpace").append(enemyDiv);
    }

    /* Attack! - Note: eval() is used here. JJ says it is dangerous so hopefully there is an alternative. */
    function attack() {
        eval(enemy).health = eval(enemy).health - eval(playerCharacter).attack;
        $('#' + enemy + '> .character > .health').text(eval(enemy).health);
    }

    $(".character").on("click", function () {
        if (characterChooser == true) {
            selectCharacter(this.id);
            characterChooser = false;
            $("#toolTip").text("Choose an opponent!")
        } else {
            selectEnemy(this.id);
            $(".character").off("click");
        }
        $('#' + this.id).removeClass("selectable");
        $('#' + this.id).removeClass("col-sm-6 col-md-4 col-lg-3");
    });
    
    $("#gameSpace").on("click", ".attackButton", function () {
        console.log("test");
        attack();
    });
    console.log("test");
});
