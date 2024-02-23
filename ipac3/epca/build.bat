REM * 20.09.17 kp; zmena adresare
REM * 05.05.17 mj; uprava pro davkove spousteni
@ECHO OFF
CD ..
CD ..
CD grunt
REM CALL grunt i3 --app=epca -debug --verbose --force
CALL grunt i3 --app=epca
set verbose=%1
IF NOT DEFINED verbose set verbose=ON
IF NOT %verbose%==off PAUSE