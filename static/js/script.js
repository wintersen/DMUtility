$(document).ready(function(){
    // $('#homeComponent').hide();
    // $('#itHome').hide();
    // $('#userHome').hide();
    $('#Login').on('click', function() {
        $.ajax({
            url: '/login',
            data: $('#formLogin').serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
                if(response.auth === true){
                    localStorage.setItem('userdata', JSON.stringify(response.user));
                    $('#loginComponent').hide();
                    let user = JSON.parse(localStorage.getItem('userdata'));
                    console.log(user);
                    getCampaignTable();
                }else{
                    $('#errorMessageLogin').text('Incorrect email and/or password.')
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

    $('#Register').on('click', function() {
        $.ajax({
            url: '/register',
            data: $('#formRegister').serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
                if(response.registered === true){
                    $('#myForm').trigger("reset");
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
                    $('#CampaignTableBody').append("<tr><td>" + val.id + "</td><td>" + val.name + "</td><td>" + val.status + "</td></tr>");
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