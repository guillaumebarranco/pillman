#Pillman

##Description
Pillman is a Ionic 2 application for the nurses. It provides a list of all medicaments given from Open French Government API and store them in the app memory, giving the nurse no need to have Internet to check on generic names, side effects, etc... Only updates about every week are needed, with a WIFI connection to always be up to date (important).

##Deployment
	git clone https://github.com/guillaumebarranco/pillman
	npm install / yarn
	ionic serve

##TODO
	Make update system, from Pillman API -> DONE
	Add eslint and somes rules to make code lot cleaner
	Add unit test system

##Remember
	Every file called staticly (even a .json file from http.get) must be in src/assets folder
