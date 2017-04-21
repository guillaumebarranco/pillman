import { Component, Input } from '@angular/core';

import { ApiService } from './../../services/api.service';

@Component({
	selector: 'page-home',
	templateUrl: './home.html',
	providers: [ApiService],
	styles: []
})

export class HomePage {

	@Input() medoc;
	elements: any;

	public searchType			: string;
	public searchStr 			: string;
	public loader;
	public recentResearch		: any;
	public showAllEffects		: boolean 	= true;
	public popupFilter			: boolean 	= true;
	public researchDone			: boolean 	= true;
	public search;

	labos						: string[];

	constructor(private apiService: ApiService) {

		this.setSearchType();
		this.elements = [];
		this.recentResearch = this.getRecentResearch();

		this.setLabos();
	}

	ngOnInit() {

		this.showLoader();
		this.getMedocs();
	}

	getMedocs() {

		this.apiService.getMedocs().subscribe(medocs => {
			this.hideLoader();

			// console.log(medocs);
			// console.log(medocs.json());

			// this.elements = this.formateMedocs(medocs.json());
			this.elements = this.formateMedocs(medocs.json().slice(0, 15));
			// console.log(this.elements);
			this.medoc = this.elements[0];

			if(this.medoc.side_effect.length > 100) {
				this.showAllEffects = false;
			}
		});
	}

	/*********************/
	/*       EVENTS      */
	/*********************/

		public changeResearch(search) {

			if(search !== "") {
				this.search = search;
				this.researchDone = false;
			}
		}

		// Event on click, disable truncate string for side_effects
		public seeAllDetails() {
			this.showAllEffects = true;
		}

		public changeMedoc(medoc) {

			if(typeof medoc.cis !== "undefined") medoc = medoc.cis;

			for(let i in this.elements) {

				if(this.elements[i].cis === medoc) {

					this.setMedoc(this.elements[i]);
					this.setRecentResearch(this.elements[i]);

					if(this.medoc.side_effect.length > 100) {
						this.showAllEffects = false;
					}
				}
			}
		}

		openFilter() {

			if(this.popupFilter) {
				this.popupFilter = false;
			} else {
				this.popupFilter = true;
			}
		}

	/*********************/
	/*       UTILS       */
	/*********************/

		public formateMedocs(datas) {
			return datas;
		}

		public showLoader() {
			this.loader = 1;
		}

		public hideLoader() {
			this.loader = 0;
		}

	/*********************/
	/*      SETTERS      */
	/*********************/

		private setMedoc(medoc) {
			this.medoc = medoc;
		}

		public sessionSearchTypeExists() {

			if(
				localStorage.getItem("searchType") !== null 
				&& (localStorage.getItem("searchType") === "name" || localStorage.getItem("searchType") === "denomination")
			) {
				return true;
			}

			return false;
		}

		changeSearchType(searchType) {
			this.searchType = searchType;
			localStorage.setItem('searchType', searchType);
		}

		private setSearchType() {

			if(this.sessionSearchTypeExists()) {
				this.searchType = localStorage.getItem("searchType");
			} else {
				this.searchType = "name";
			}
		}

		public setRecentResearch(recent) {

			if(recent !== null) {

				if(localStorage.getItem("recentResearch") !== null) {

					var recentResearch = JSON.parse(localStorage.getItem("recentResearch"));

					// console.log(recentResearch);

					var canPush = true;

					for(var i in recentResearch) {

						if(recentResearch[i].name === recent.name) {
							canPush = false;
						}
					}

					if(canPush) {
						recentResearch.push(recent);
						localStorage.setItem("recentResearch", JSON.stringify(recentResearch));
					}

				} else {
					localStorage.setItem("recentResearch", JSON.stringify([recent]));
				}

				this.recentResearch = JSON.parse(localStorage.getItem("recentResearch"));
			}
		}

		private setLabos() {

			this.labos = [
				"ISOMED",
				"CRISTERS",
				"TEVA",
				"BIOGARAN",
				"MYLAN",
				"ALMUS",
				"RPG",
				"ARROW",
				"EVOLUGEN",
				"SANDOZ",
				"QUALIMED",
				"EG",
				"ZYDUS",
				"ZENTIVA",
				"RATIOPHARM",
				"RANBAXY",
				"SET",
				"PHR",
				"LAB",
				"PHARMA"
			];
		}

		public updateSearchType() {
			localStorage.setItem("searchType", this.searchType);
			window.location.reload();
		}

		public changeResearchDone(element) {
			this.medoc = element;
			this.showAllEffects = false;
			this.researchDone = true;
		}

	/*********************/
	/*      GETTERS      */
	/*********************/

		private getRecentResearch() {

			if(localStorage.getItem("recentResearch") !== null) {
				return JSON.parse(localStorage.getItem("recentResearch"));
			}

			return [];
		}
}
