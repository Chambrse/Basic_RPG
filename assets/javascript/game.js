$(document).ready(function () {

    /* Initialize variables. */
    var characterChooser = 0;
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
        $(".attackButton").on("click", function() {
            attack();
        });
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

    $(".cWrapper").on("click", function () {
        if (characterChooser == 0) {
            selectCharacter(this.id);
            characterChooser++;
            $("#toolTip").text("Choose an opponent!")
        } else {
            selectEnemy(this.id);
        }
        $('#' + this.id).off("click");
        $('#' + this.id).children().removeClass("selectable");
        $('#' + this.id).removeClass("col-sm-6 col-md-4 col-lg-3");
    });

});
