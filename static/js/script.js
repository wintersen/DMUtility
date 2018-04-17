$(document).ready(function(){
    // $('#homeComponent').hide();
    // $('#itHome').hide();
    // $('#userHome').hide();
    $('#login-button').on('click', function() {
        $.ajax({
            url: '/login',
            data: $('#login-form').serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
                if(response.auth === true){
                    localStorage.setItem('userdata', JSON.stringify(response.user));
                    $('#login-modal').hide();
                    let user = JSON.parse(localStorage.getItem('userdata'));
                    console.log(user);
                    $('#login').hide();
                    $('#campaignselect').show();
                    // getCampaignTable();
                }else{
                    $('#errorMessageLogin').text('Username and password do not match.');
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

    $('#register-button').on('click', function() {
        $.ajax({
            url: '/register',
            data: $('#register-form').serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
                if(response.registered === true){
                    $('#register-form').trigger("reset");
                    $('#errorMessageReg').text('Registration successful!')
                }else{
                    $('#errorMessageReg').text('Registration failed. Try again.')
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

    // make enter submit form
    $('#login-form input').keydown(function(e) {
        if (e.keyCode == 13) {
            $('#login-button').click();
        }
    });
    
    // get campaign list
    function getCampaignTable(){
        // tempuser = localStorage.getItem('userdata');
        // let parseduser;
        // if (tempuser) {
        //     parseduser = JSON.parse(tempuser);
        //     let uid
        // }
        $.ajax({
            url: '/campaigns',
            type: 'GET',
            success: function(response) {
                $('#CampaignTableBody').empty();
                response.campaigns.forEach(function(val){
                    // $('#CampaignTableBody').append("<tr><td>" + val.id + "</td><td>" + val.name + "</td><td>" + val.status + "</td></tr>");
                    $('#CampaignTableBody').append("<tr><button id='campaign-button-" + val.id + "' type='button' class='btn btn-secondary btn-lg btn-block'><div class='row text-center'><div class='col-sm-4'>" + val.name + "</div><div class='col-sm-4'>" + val.status + "</div></div></button></tr>");
                });
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    // get notes for campaign
    function getNotesTable(){
        tempcid = localStorage.getItem('cid');
        let parsedcid;
        if (tempcid) {
            parsedcid = JSON.parse(tempcid);
            let cid = parsedcid.cid;
            $.ajax({
                url: '/notes',
                data: {
                    cid: cid
                },
                contentType: "application/json",
                dataType: "json",
                type: 'GET',
                success: function(response) {
                    $('#NotesTableBody').empty();
                    response.notes.forEach(function(val){
                        $('#NotesTableBody').append("<tr><td>" + val.id + "</td><td>" + val.name + "</td><td>" + val.content + "</td></tr>");
                    });
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    }

    function getNPCTable(){
        tempcid = localStorage.getItem('cid');
        let parsedcid;
        if (tempcid) {
            parsedcid = JSON.parse(tempcid);
            let cid = parsedcid.cid;
            $.ajax({
                url: '/npcs',
                data: {
                    cid: cid
                },
                contentType: "application/json",
                dataType: "json",
                type: 'GET',
                success: function(response) {
                    $('#NPCTableBody').empty();
                    response.npcs.forEach(function(val){
                        $('#NPCTableBody').append("<tr><td>" + val.id + "</td><td>" + val.name + "</td><td>" + val.occupation + "</td><td>" + val.description + "</td><td>" + val.traits + "</td><td>" + val.race + "</td><td>" + val.alignment + "</td><td>" + val.note + "</td><td>" + val.str + "</td><td>" + val.dex + "</td><td>" + val.con + "</td><td>" + val.int + "</td><td>" + val.wis + "</td><td>" + val.chr + "</td><td>" + val.ac + "</td><td>" + val.hp + "</td></tr>");
                    });
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    }

    function getMonsterTable(){
        tempcid = localStorage.getItem('cid');
        let parsedcid;
        if (tempcid) {
            parsedcid = JSON.parse(tempcid);
            let cid = parsedcid.cid;
            $.ajax({
                url: '/monsters',
                data: {
                    cid: cid
                },
                contentType: "application/json",
                dataType: "json",
                type: 'GET',
                success: function(response) {
                    $('#MonsterTableBody').empty();
                    response.npcs.forEach(function(val){
                        $('#MonsterTableBody').append("<tr><td>" + val.id + "</td><td>" + val.name + "</td><td>" + val.equipment + "</td><td>" + val.note + "</td><td>" + val.str + "</td><td>" + val.dex + "</td><td>" + val.con + "</td><td>" + val.int + "</td><td>" + val.wis + "</td><td>" + val.chr + "</td><td>" + val.ac + "</td><td>" + val.hp + "</td></tr>");
                    });
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    }

    function getLocationTable(){
        tempcid = localStorage.getItem('cid');
        let parsedcid;
        if (tempcid) {
            parsedcid = JSON.parse(tempcid);
            let cid = parsedcid.cid;
            $.ajax({
                url: '/locations',
                data: {
                    cid: cid
                },
                contentType: "application/json",
                dataType: "json",
                type: 'GET',
                success: function(response) {
                    $('#LocationTableBody').empty();
                    response.npcs.forEach(function(val){
                        $('#LocationTableBody').append("<tr><td>" + val.id + "</td><td>" + val.name + "</td><td>" + val.xcoord + "</td><td>" + val.ycoord + "</td><td>" + val.description + "</td><td>" + val.note + "</td><td>" + val.services + "</td></tr>");
                    });
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    }
});