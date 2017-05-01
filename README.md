# Pillman

## Description
Pillman is a Ionic 2 application for the nurses. It provides a list of all medicaments given from Open French Government API and store them in the app memory, giving the nurse no need to have Internet to check on generic names, side effects, etc... Only updates about every week are needed, with a WIFI connection to always be up to date (important).

## Deployment
	git clone https://github.com/guillaumebarranco/pillman
	npm install / yarn
	ionic serve
	cordova platform add android
	ionic run android

## TODO
	Add unit test system

## Remember
	Every file called staticly (even a .json file from http.get) must be in src/assets folder

## Flow
	When you open Pillman here a the steps
	1. It checks if there is a need for maj
		=> Get API version and App version. Then propose Maj
		=> You can accept or refuse the Maj. If refused, it will remember you in a week

## Component Tree
	app.component
		menu
		maj
		home
			search filters
			search input
			after search choices
			element presentation card
		recent
		options
