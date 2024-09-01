REM Open Visual Studio Code
start "" "cmd" /c "code ."

REM Run npm run dev in a new Command Prompt window and close it afterwards
start "" "cmd" /c "npm run dev"

REM Wait for a few seconds to ensure npm has started the server
timeout /t 5 /nobreak >nul

REM Open Google Chrome with the localhost link
start "" "chrome" "http://localhost:5173"

REM Exit the initial Command Prompt window
exit
