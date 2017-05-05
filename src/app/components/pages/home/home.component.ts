import { Component, Input } from '@angular/core';

import { ApiService } from '../../../services/api.service';
import { SessionService } from '../../../services/session.service';
import { UtilService } from '../../../services/util.service';

@Component({
	selector: 'page-home',
	templateUrl: './home.html',
	providers: [ApiService, SessionService, UtilService],
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

	constructor(private apiService: ApiService, private sessionService: SessionService, private utilService: UtilService) {

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

		const recentResearch = this.sessionService.getRecentResearch();

		if(typeof recentResearch[0] !== "undefined") {

			this.medoc = recentResearch[recentResearch.length - 1];

			if(typeof this.medoc.effects !== "undefined" && this.medoc.effects.length > 100) {
				this.showAllEffects = false;
			}
		}
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

		// Event on click, disable truncate string for effectss
		public seeAllDetails() {
			this.showAllEffects = true;
		}

		public hideAllDetails() {
			this.showAllEffects = false;
		}

		public changeMedoc(medoc) {

			if(typeof medoc.cis !== "undefined") medoc = medoc.cis;

			for(let i in this.elements) {

				if(this.elements[i].cis === medoc) {

					this.setMedoc(this.elements[i]);
					this.setRecentResearch(this.elements[i]);

					if(this.medoc.effects.length > 100) {
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
			return this.sessionService.sessionSearchTypeExists();
		}

		changeSearchType(searchType) {
			this.searchType = searchType;
			this.sessionService.setSearchType(searchType);
		}

		private setSearchType() {

			if(this.sessionSearchTypeExists()) {
				this.searchType = this.sessionService.getSearchType();
			} else {
				this.searchType = "name";
			}
		}

		public setRecentResearch(recent) {

			if(recent !== null) {

				if(this.sessionService.recentResearchExists()) {

					let recentResearch = this.sessionService.getRecentResearch();
					let canPush = true;

					for(const i in recentResearch) {

						if(recentResearch[i].name === recent.name) {
							canPush = false;
						}
					}

					if(canPush) {
						recentResearch.push(recent);
						this.sessionService.setRecentResearch(JSON.stringify(recentResearch));
					}

				} else {
					this.sessionService.setRecentResearch(JSON.stringify([recent]));
				}

				this.recentResearch = this.sessionService.getRecentResearch();
			}
		}

		private setLabos() {
			return this.utilService.getLabos();
		}

		public updateSearchType() {
			this.sessionService.setSearchType(this.searchType);
			window.location.reload();
		}

		public changeResearchDone(element) {
			this.medoc = element;

			this.sessionService.addRecentResearchElement(element);

			this.showAllEffects = false;
			this.researchDone = true;
		}

	/*********************/
	/*      GETTERS      */
	/*********************/

		private getRecentResearch() {

			if(this.sessionService.recentResearchExists()) {
				return this.sessionService.getRecentResearch();
			}

			return [];
		}
}
