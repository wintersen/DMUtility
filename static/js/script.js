$(document).ready(function(){
    $('#login-button').on('click', function() {
        $.ajax({
            url: '/login',
            data: $('#login-form').serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
                if(response.auth === true){
                    localStorage.setItem('userdata', JSON.stringify(response.user));
                    $('#close-login').click();
                    let user = JSON.parse(localStorage.getItem('userdata'));
                    console.log(user);
                    $('#login').hide();
                    $('#campaignselect').show();
                    getCampaignTable();
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

    // Submit new campaign
    $('#create-campaign').on('click', function(){
        $.ajax({
            url: '/newCampaign',
            data: $('#campaign-form').serialize(),
            type: 'POST',
            success: function(response) {
                if(response.created === true){
                    $('#campaign-form').trigger("reset");
                    $('#errorMessageCampaign').text('Successfully created new campaign.');
                    getCampaignTable();
                    // $('#close-create-campaign').click();
                }else{
                    $('#errorMessageCampaign').text('Creation failed. Try again.');
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

    // submit new note
    $('#create-note').on('click', function(){
        $.ajax({
            url: '/newNote',
            data: $('#note-form').serialize(),
            type: 'POST',
            success: function(response) {
                if(response.created === true) {
                    $('#note-form').trigger("reset");
                    $('#errorMessageNote').text('Successfully created new note.');
                    getNotesTable();
                }else{
                    $('#errorMessageNote').text('Creation failed. Try again.');
                }
            },
            error: function(error){
                console.log(error);
            }
        });
    });

    // create npc
    $('#create-npc').on('click', function(){
        $.ajax({
            url: '/newNpc',
            data: $('#npc-form').serialize(),
            type: 'POST',
            success: function(response) {
                if(response.created === true) {
                    $('#npc-form').trigger("reset");
                    $('#errorMessageNPC').text('Successfully created new NPC.');
                    getNPCTable();
                }else{
                    $('#errorMessageNPC').text('Creation failed. Try again.');
                }
            },
            error: function(error){
                console.log(error);
            }
        });
    });

    // create monster
    $('#create-monster').on('click', function(){
        $.ajax({
            url: '/newMonster',
            data: $('#monster-form').serialize(),
            type: 'POST',
            success: function(response) {
                if(response.created === true) {
                    $('#monster-form').trigger("reset");
                    $('#errorMessageMonster').text('Successfully created new monster.');
                    getMonsterTable();
                }else{
                    $('#errorMessageMonster').text('Creation failed. Try again.');
                }
            },
            error: function(error){
                console.log(error);
            }
        });
    });

    $("#CampaignTableBody").on('click', function(e){
        console.log(e);
        if (e.target.id.includes('campaign-selection-button')) {
            cid = e.target.id.split("-")[3];
            openCampaign(cid);
            return;
        }
        temp = e.target.parentNode;
        for(i = 1;!temp.id.includes('campaign-selection-button'); i++){
            if (temp.parentNode.id === 'CampaignTableBody') {
                return;
            }
            temp = temp.parentNode;
        }
        cid = temp.id.split("-")[3];
        openCampaign(cid);
    });

    $('#notes-table').on('click', function(e){
        id = e.target.id;
        if (id.includes('banish-note-')) {
            nid = id.split('-')[2];
            $.ajax({
                url: '/notes',
                type: 'DELETE',
                data: JSON.stringify({ nid: nid }),
                contentType: 'application/json',
                dataType: 'json',
                success: function(response){
                    if (response.deleted) {
                        getNotesTable();
                    }
                },
                error: function(error){
                    console.log(error);
                }
            });
        }
    });
    
    // banish npc
    $('#npcs-table').on('click', function(e){
        id = e.target.id;
        if (id.includes('banish-npc-')) {
            nid = id.split('-')[2];
            $.ajax({
                url: '/npcs',
                type: 'DELETE',
                data: JSON.stringify({ nid: nid }),
                contentType: 'application/json',
                dataType: 'json',
                success: function(response){
                    if (response.deleted) {
                        getNPCTable();
                    }
                },
                error: function(error){
                    console.log(error);
                }
            });
        }
    });
    
    // banish monster
    $('#monster-table').on('click', function(e){
        id = e.target.id;
        if (id.includes('banish-monster-')) {
            mid = id.split('-')[2];
            $.ajax({
                url: '/monsters',
                type: 'DELETE',
                data: JSON.stringify({ mid: mid }),
                contentType: 'application/json',
                dataType: 'json',
                success: function(response){
                    if (response.deleted) {
                        getMonsterTable();
                    }
                },
                error: function(error){
                    console.log(error);
                }
            });
        }
    });
    
    // get campaign list
    function getCampaignTable(){
        tempuser = localStorage.getItem('userdata');
        let parseduser;
        if (tempuser) {
            parseduser = JSON.parse(tempuser);
        }
        var uid = JSON.stringify(parseduser.id);
        $.ajax({
            url: '/campaigns',
            type: 'GET',
            success: function(response) {
                $('#CampaignTableBody').empty();
                response.campaigns.forEach(function(val){
                    $('#CampaignTableBody').append("<div class='row text-center'><button type='button' id='campaign-selection-button-" + val.id + 
                        "' class='btn btn-secondary btn-lg btn-block'><div class='row text-center'><div class='col-sm-4'>" + val.name + 
                        "</div><div class='col-sm-4'> Status: " + val.status + "</div></div></button></row>");
                });
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    function openCampaign(cid){
        $.ajax({
            url: '/setCampaign',
            type: 'POST',
            data: JSON.stringify(cid),
            contentType: 'application/json',
            dataType: 'json',
            success: function(response) {
                if (response.set) {
                    localStorage.setItem('cid', cid);
                    $('#campaignselect').hide();
                    $('#home').show();
                    console.log("CID: " + cid);
                    getNotesTable();
                    getNPCTable();
                    getMonsterTable();
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    // get notes for campaign
    function getNotesTable(){
        cid = localStorage.getItem('cid');
        
        $.ajax({
            url: '/notes',
            /*data: {
                cid: JSON.stringify(cid)
            },*/
            contentType: "application/json",
            dataType: "json",
            type: 'POST',
            success: function(response) {
                $('#notes-table').empty();
                response.notes.forEach(function(val){
                    $('#notes-table').append("<div id='notes-acc-" + val.id + 
                        "'><div class='card'><div id='notes-heading-" + val.id + 
                        "' class='card-header'><h5 class='mb-0'><button class='btn btn-link' data-toggle='collapse' data-target='#note-collapse-" + val.id + 
                        "' aria-expanded='false' aria-controls='note-collapse-" + val.id + 
                        "'>" + val.name + "</button></h5></div><div id='note-collapse-" + val.id + 
                        "' class='collapse' aria-labelledby='notes-heading-" + val.id + 
                        "' data-parent='#notes-acc-" + val.id + "'><div class='card-body'><p>" + val.content + 
                        "</p><button type='button' class='btn btn-primary btn-sm' id='banish-note-" + val.id +
                        "'>BANISH NOTE</button></div></div></div></div>");                    
                });
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    function getNPCTable(){
        cid = localStorage.getItem('cid');
        $.ajax({
            url: '/npcs',
            /*data: {
                cid: JSON.stringify(cid)
            },*/
            contentType: "application/json",
            dataType: "json",
            type: 'POST',
            success: function(response) {
                console.log(response.npcs);
                $('#npcs-table').empty();
                response.npcs.forEach(function(val){
                    $('#npcs-table').append("<div id='npcacc" + val.id + "'><div class='card'><div class='card-header' id='npchead" + val.id + "'><h5 class='mb-0'><button class='btn btn-link' data-toggle='collapse' data-target='#npc" + val.id + "' aria-expanded='false' aria-controls='npc" + val.id + "' id='NPC_name'>" + val.name + "</button></h5></div><div id='npc" + val.id + "' class='collapse' aria-labelledby='npchead" + val.id + "' data-parent='#npcacc" + val.id + "'><div class='card-body'><table class='table text-center'><thead><tr><th scope='col'>JOB</th><th scope='col'>DESCRIPTION</th><th scope='col'>TRAITS</th><th scope='col'>RACE</th><th scope='col'>ALIGNMENT</th><th scope='col'>STATS</th></tr></thead><tbody><tr><td id='job_td'>" + val.occupation +"</td><td id='desc_td'>" + val.description +"</td><td id='traits_td'>" + val.traits +"</td><td id='race_td'>" + val.race +"</td><td id='align_td'>" + val.alignment +"</td><td id='stats_td'><table><thead><th>HP</th><th>AC</th><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHR</th></thead><tr><td id='HP_td'>" + val.hp +"</td><td id='AC_td'>" + val.ac +"</td><td id='STR_td'>" + val.str +"</td><td id='DEX_td'>" + val.dex +"</td><td id='CON_td'>" + val.con +"</td><td id='INT_td'>" + val.int +"</td><td id='WIS_td'>" + val.wis +"</td><td id='CHR_td'>" + val.chr +"</td></tr></table></td></tr></tbody></table><button type='button' class='btn btn-primary btn-sm' id='banish-npc-" + val.id + "'>BANISH NPC</button></div></div></div></div>");
                });
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    function getMonsterTable(){
        cid = localStorage.getItem('cid');
        $.ajax({
            url: '/monsters',
            /*data: {
                cid: JSON.stringify(cid)
            },*/
            contentType: "application/json",
            dataType: "json",
            type: 'POST',
            success: function(response) {
                $('#monster-table').empty();
                response.monsters.forEach(function(val){
                    $('#monster-table').append(
                        "<div id='monacc" + val.id + "'><div class='card'><div class='card-header' id='monhead" + val.id + "'><h5 class='mb-0'><button class='btn btn-link' data-toggle='collapse' data-target='#mon" + val.id + "' aria-expanded='false' aria-controls='mon" + val.id + "' id='mon_name'>" + val.name + "</button></h5></div><div id='mon" + val.id + "' class='collapse' aria-labelledby='monhead" + val.id + "' data-parent='#monacc" + val.id + "'><div class='card-body'><table class='table text-center'><thead><tr><th scope='col'>EQUIPMENT</th><th scope='col'>DESCRIPTION</th><th scope='col'>STATS</th></tr></thead><tbody><tr><td id='equip_td'>" + val.equipment + "</td><td id='m_desc_td'>" + val.note + "</td><td id='m_stats_td'><table style='margin: 0px auto'><thead><th>HP</th><th>AC</th><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHR</th></thead><tr><td id='mHP_td'>" + val.hp + "</td><td id='mAC_td'>" + val.ac +"</td><td id='mSTR_td'>" + val.str +"</td><td id='mDEX_td'>" + val.dex +"</td><td id='mCON_td'>" + val.con +"</td><td id='mINT_td'>" + val.int +"</td><td id='mWIS_td'>" + val.wis +"</td><td id='mCHR_td'>" + val.chr +"</td></tr></table></td></tr></tbody></table><button type='button' id='banish-monster-" + val.id + "' class='btn btn-primary btn-sm'>BANISH MONSTER</button></div></div></div></div>"       
                    );
                });
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    function getLocationTable(){
        cid = localStorage.getItem('cid');
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
                    $('#LocationTableBody').append("<tr><td>" + val.id + "</td><td>" + val.name + "</td><td>" + 
                        val.xcoord + "</td><td>" + val.ycoord + "</td><td>" + val.description + "</td><td>" + 
                        val.note + "</td><td>" + val.services + "</td></tr>");
                });
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
});
