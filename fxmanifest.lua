fx_version 'cerulean'
game 'gta5'

name 'fivem-typescript-boilerplate'
description 'FiveM TypeScriptプラグイン開発のためのボイラープレート'
author 'Your Name'
version '1.0.0'

node_version '22'

client_script 'dist/client.js'
server_script 'dist/server.js'

ui_page 'ui/dist/index.html'

files {
  'ui/dist/**'
}

dependencies {
  'qbx_core',
  'oxmysql'
} 