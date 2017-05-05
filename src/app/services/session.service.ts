export class SessionService {

	constructor() {}

	issetItem(item) {
		return typeof localStorage.getItem(item) !== "undefined" && localStorage.getItem(item) !== null && localStorage.getItem(item) !== "null";
	}

	/**********************/
	/*     Search type    */
	/**********************/

		sessionSearchTypeExists() {
			return localStorage.getItem("searchType") !== null &&
				(localStorage.getItem("searchType") === "name" || localStorage.getItem("searchType") === "dci");
		}

		setSearchType(searchType) {
			localStorage.setItem('searchType', searchType);
		}

		getSearchType() {
			return localStorage.getItem("searchType");
		}

	/**********************/
	/*       Theme        */
	/**********************/

		themeExists() : boolean {
			return localStorage.getItem("theme") !== null;
		}

		getTheme() : string {
			return localStorage.getItem('theme');
		}

		setTheme(theme) {
			localStorage.setItem('theme', theme);
		}

	/**********************/
	/*   Recent research  */
	/**********************/

		recentResearchExists() : boolean {
			return this.issetItem('recentResearch');
		}

		setRecentResearch(element) {
			localStorage.setItem("recentResearch", element);
		}

		getRecentResearch() {

			if(this.issetItem("recentResearch")) {
				return JSON.parse(localStorage.getItem("recentResearch"));
			}

			return [];
		}

		addRecentResearchElement(element: any) {

			const recentResearch = this.getRecentResearch();
			recentResearch.push(element);
			this.setRecentResearch(JSON.stringify(recentResearch));
		}

	/**********************/
	/*      Firstname     */
	/**********************/

		firstnameExists(): boolean { 
			return this.issetItem('firstname');
		}

		getFirstname(): string {
			return localStorage.getItem('firstname');
		}

		setFirstname(firstname) {
			localStorage.setItem('firstname', firstname);
		}

	/**********************/
	/*      Maj Items     */
	/**********************/

		getLastMajVersion(): string {
			return localStorage.getItem('lastMajVersion');
		}

		setLastMajVersion(element) {
			localStorage.setItem('lastMajVersion', element);
		}

		getCurrentApiVersion(): string {
			return localStorage.getItem('currentApiVersion');
		}

		setCurrentApiVersion(element) {
			localStorage.setItem('currentApiVersion', element);
		}

		setNextProposalUpdate(element) {
			localStorage.setItem('nextProposalUpdate', element);
		}

		getNextProposalUpdate(): string {
			return localStorage.getItem('nextProposalUpdate');
		}

		getWaitForProposal(): string {
			return localStorage.getItem('waitForProposal');
		}

		setWaitForProposal(element) {
			localStorage.setItem('waitForProposal', element);
		}
}
