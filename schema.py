#################################################################################
# users table
#################################################################################
create_users_table = "CREATE TABLE IF NOT EXISTS users(" \
              "id        INTEGER PRIMARY KEY AUTOINCREMENT," \
              "firstname TEXT    NOT NULL," \
              "lastname  TEXT," \
              "username  TEXT    UNIQUE NOT NULL," \
              "password  TEXT    NOT NULL)"

login_user = "SELECT * FROM users WHERE username=? AND password=?"

register_user = "INSERT INTO users(firstname, lastname, username, password) VALUES (?,?,?,?);"

#################################################################################
# campaigns table
#################################################################################
create_campaigns_table = "CREATE TABLE IF NOT EXISTS campaigns(" \
                "id           INTEGER PRIMARY KEY AUTOINCREMENT," \
                "owner        TEXT," \
                "name         TEXT    NOT NULL," \
                "status       TEXT    NOT NULL," \
                "CONSTRAINT fk_campaigns FOREIGN KEY (owner) " \
                "REFERENCES users(username) ON DELETE CASCADE)"

new_campaign = "INSERT INTO campaigns(owner, name, status) VALUES (?,?,'not started');"

get_campaigns = "SELECT * FROM campaigns WHERE owner=?"

delete_campaign = "DELETE FROM campaigns WHERE id=?"

set_campaign_status = "UPDATE campaigns SET status=? WHERE id=?"

#################################################################################
# notes table
#################################################################################
create_notes_table = "CREATE TABLE IF NOT EXISTS notes(" \
                  "id          INTEGER PRIMARY KEY AUTOINCREMENT," \
                  "campaign_id INTEGER," \
                  "name        TEXT    NOT NULL," \
                  "content     TEXT    NOT NULL, " \
                  "CONSTRAINT fk_notes FOREIGN KEY (campaign_id) " \
                  "REFERENCES campaigns(id) ON DELETE CASCADE)"

new_note = "INSERT INTO notes(campaign_id, name, content) VALUES (?,?,?);"

get_notes = "SELECT * FROM notes WHERE campaign_id=?"

delete_note = "DELETE FROM notes WHERE id=?"

edit_note_content = "UPDATE notes SET content=? WHERE id=?"

#################################################################################
# npcs table
#################################################################################
create_npcs_table = "CREATE TABLE IF NOT EXISTS npcs(" \
                  "id          INTEGER PRIMARY KEY AUTOINCREMENT," \
                  "campaign_id INTEGER," \
                  "loc_id      INTEGER," \
                  "name        TEXT    NOT NULL," \
                  "occupation  TEXT," \
                  "description TEXT," \
                  "traits      TEXT," \
                  "race        TEXT," \
                  "alignment   TEXT," \
                  "note        TEXT," \
                  "str         INTEGER NOT NULL," \
                  "dex         INTEGER NOT NULL," \
                  "con         INTEGER NOT NULL," \
                  "int         INTEGER NOT NULL," \
                  "wis         INTEGER NOT NULL," \
                  "chr         INTEGER NOT NULL," \
                  "ac          INTEGER NOT NULL," \
                  "hp          INTEGER NOT NULL," \
                  "CONSTRAINT fk_npcs FOREIGN KEY (campaign_id) " \
                  "REFERENCES campaigns(id) ON DELETE CASCADE)"

new_npc = "INSERT INTO npcs(campaign_id, loc_id, name, occupation, description, traits, race, alignment, note, str, dex, con, int, wis, chr, ac, hp) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

get_npcs = "SELECT * FROM npcs WHERE campaign_id=?"

delete_npc = "DELETE FROM npcs WHERE id=?"

set_npc_loc = "UPDATE npcs SET loc_id=? WHERE id=?"

set_npc_description = "UPDATE npcs SET description=? WHERE id=?"

set_npc_traits = "UPDATE npcs SET traits=? WHERE id=?"

set_npc_alignment = "UPDATE npcs SET alignment=? WHERE id=?"

set_npc_note = "UPDATE npcs SET note=? WHERE id=?"

set_npc_stats = "UPDATE npcs SET str=?, dex=?, con=?, int=?, wis=?, chr=?, ac=?, hp=? WHERE id=?"

set_npc_str = "UPDATE npcs SET str=? WHERE id=?"

set_npc_dex = "UPDATE npcs SET dex=? WHERE id=?"

set_npc_con = "UPDATE npcs SET con=? WHERE id=?"

set_npc_int = "UPDATE npcs SET int=? WHERE id=?"

set_npc_wis = "UPDATE npcs SET wis=? WHERE id=?"

set_npc_chr = "UPDATE npcs SET chr=? WHERE id=?"

set_npc_ac = "UPDATE npcs SET ac=? WHERE id=?"

set_npc_hp = "UPDATE npcs SET hp=? WHERE id=?"

#################################################################################
# monsters table
#################################################################################
create_monsters_table = "CREATE TABLE IF NOT EXISTS monsters(" \
                  "id INTEGER PRIMARY KEY AUTOINCREMENT," \
                  "campaign_id INTEGER NOT NULL," \
                  "name        TEXT    NOT NULL," \
                  "equipment   TEXT," \
                  "note        TEXT," \
                  "str         INTEGER NOT NULL," \
                  "dex         INTEGER NOT NULL," \
                  "con         INTEGER NOT NULL," \
                  "int         INTEGER NOT NULL," \
                  "wis         INTEGER NOT NULL," \
                  "chr         INTEGER NOT NULL," \
                  "ac          INTEGER NOT NULL," \
                  "hp          INTEGER NOT NULL," \
                  "CONSTRAINT fk_monsters FOREIGN KEY (campaign_id) " \
                  "REFERENCES campaigns(id) ON DELETE CASCADE)"

new_monster = "INSERT INTO monsters(campaign_id, name, note, str, dex, con, int, wis, chr, ac, hp) VALUES (?,?,?,?,?,?,?,?,?,?,?)"

get_monsters = "SELECT * FROM monsters WHERE campaign_id=?"

delete_monster = "DELETE FROM monsters WHERE id=?"

set_monster_equipment = "UPDATE monsters SET equipment=? WHERE id=?"

set_npc_note = "UPDATE monsters SET note=? WHERE id=?"

set_npc_stats = "UPDATE monsters SET str=?, dex=?, con=?, int=?, wis=?, chr=?, ac=?, hp=? WHERE id=?"

set_npc_str = "UPDATE monsters SET str=? WHERE id=?"

set_npc_dex = "UPDATE monsters SET dex=? WHERE id=?"

set_npc_con = "UPDATE monsters SET con=? WHERE id=?"

set_npc_int = "UPDATE monsters SET int=? WHERE id=?"

set_npc_wis = "UPDATE monsters SET wis=? WHERE id=?"

set_npc_chr = "UPDATE monsters SET chr=? WHERE id=?"

set_npc_ac = "UPDATE monsters SET ac=? WHERE id=?"

set_npc_hp = "UPDATE monsters SET hp=? WHERE id=?"

#################################################################################
# locations table
#################################################################################
create_locations_table = "CREATE TABLE IF NOT EXISTS locations(" \
                  "id INTEGER PRIMARY KEY AUTOINCREMENT," \
                  "campaign_id INTEGER NOT NULL," \
                  "name TEXT NOT NULL," \
                  "xcoord INTEGER," \
                  "ycoord INTEGER," \
                  "description TEXT," \
                  "note TEXT," \
                  "services TEXT," \
                  "CONSTRAINT fk_locations FOREIGN KEY (campaign_id) " \
                  "REFERENCES campaigns(id) ON DELETE CASCADE)"

new_loc = "INSERT INTO locations(campaign_id, name, xcoord, ycoord, description, note, services) VALUES (?,?,?,?,?,?,?)"

get_locs = "SELECT * FROM locations WHERE campaign_id=?"

delete_loc = "DELETE FROM locations WHERE id=?"

set_loc_description = "UPDATE locations SET description=? WHERE id=?"

set_loc_note = "UPDATE locations SET note=? WHERE id=?"

set_loc_services = "UPDATE locations SET services=? WHERE id=?"
