$(document).ready(function () {

    /* Initialize variables. */
    var characterChooser = true;
    var playerCharacterDiv;
    var enemyDiv;
    var deadEnemies = 0;

    /* Sound */
    var attackSound = new Audio("assets/sounds/attack.mp3");

    /* create death picture */
    var deathPic = $("<img>");
    deathPic.addClass("death");
    deathPic.attr("src", "assets/images/dead.png");

    /* Retry button, just reloads page. */
    var retry = $("<button>");
    retry.attr("id", "retryButton");
    retry.text("Retry");

    $("#toolTip").on("click", "#retryButton", function () {
        location = location;
    })

    /* Character objects */
    var donaldTrump = {
        baseAttack: 25,
        attack: 25,
        counter: 23,
        health: 140
    }

    var sanders = {
        baseAttack: 15,
        attack: 15,
        counter: 20,
        health: 145
    }

    var stormy = {
        baseAttack: 25,
        attack: 25,
        counter: 30,
        health: 100
    }

    var meuller = {
        baseAttack: 50,
        attack: 50,
        counter: 12,
        health: 100
    }

    /* initialize health */
    $("#donaldTrump > .health").text(donaldTrump.health);
    $("#sanders > .health").text(sanders.health);
    $("#stormy > .health").text(stormy.health);
    $("#meuller > .health").text(meuller.health);

    /* Character select functions */
    function selectCharacter(character) {
        /* Store the character */
        playerCharacter = character;
        /* remove the character card and move it to game space */
        playerCharacterDiv = $('#' + character).detach();
        $("#gameSpace").append(playerCharacterDiv);
    }

    function selectEnemy(character) {
        /* Store the enemy */
        enemy = character;
        /* Move the enemy */
        enemyDiv = $('#' + character).detach();
        $("#enemySpace").append(enemyDiv);
        $("#button").addClass("attackButton");
    }

    /* Attack! - Note: eval() is used here. JJ says it is dangerous so hopefully there is an alternative. */
    function attack() {
        /* Attack sound */
        attackSound.play();

        /* reduce the defender's health by the attacker's attack */
        eval(enemy).health -= eval(playerCharacter).attack;
        $('#' + enemy + '> .health').text(eval(enemy).health);

        /* reduce the attacker's health by the defender's counter attack */
        eval(playerCharacter).health -= eval(enemy).counter;
        $('#' + playerCharacter + '> .health').text(eval(playerCharacter).health);

        /* increase playerCharacter attack power */
        eval(playerCharacter).attack += eval(playerCharacter).baseAttack;

        /* Check if anyone died */
        if (eval(enemy).health <= 0 && eval(playerCharacter).health > 0) {

            /* count the dead */
            deadEnemies++;

            /* Check if you won! */
            if (deadEnemies === 3) {
                $("#toolTip").text("You've Won!");
                $(".buttonSpace > #button").removeClass("attackButton");

                $("#toolTip").append(" ");
                $("#toolTip").append(retry);

            } else {
                /* show as dead */
                $("#" + enemy).append(deathPic);

                /* Wait 2 seconds, then remove the card and make the remaining characters selectable again. */
                setTimeout(function () {
                    $('#' + enemy).detach();
                    $("#toolTip").text("Choose another opponent!");
                    $("#charSelectArea > .wrap > .character").addClass("selectable");
                }, 2000);

                $(".buttonSpace > #button").removeClass("attackButton");

            }
            
            /* check if you dead */
        } else if (eval(playerCharacter).health <= 0) {

            $("#" + playerCharacter).append(deathPic);
            $("#toolTip").text("You have died!");
            $(".buttonSpace > #button").removeClass("attackButton");

            $("#toolTip").append(" ");
            $("#toolTip").append(retry);

        };
    };
    /* event listener on the character cards:
        if its the first one, assign it as the player character, and move it to the game space,
        after the first time, each character chosen must be an enemy */
    $(".wrap").on("click", ".selectable", function () {
        if (characterChooser == true) {
            selectCharacter(this.id);
            characterChooser = false;
            $("#toolTip").text("Choose an opponent!");
            $('#' + this.id).removeClass("selectable");
        } else {
            selectEnemy(this.id);
            $("#toolTip").text("Attack!");
            $(".character").removeClass("selectable");
        }
    });

    /* Button event listener */
    $(".buttonSpace").on("click", ".attackButton", function () {
        attack();
    });

});
