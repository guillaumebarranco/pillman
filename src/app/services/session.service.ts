export class SessionService {

	constructor() {}

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

		themeExists() {
			return localStorage.getItem("theme") !== null;
		}

		getTheme() {
			return localStorage.getItem('theme');
		}

		setTheme(theme) {
			return localStorage.setItem('theme', theme);
		}

	/**********************/
	/*   Recent research  */
	/**********************/

		recentResearchExists() {
			return localStorage.getItem("recentResearch") !== null;
		}

		setRecentResearch(element) {
			localStorage.setItem("recentResearch", element);
		}

		getRecentResearch() {
			return JSON.parse(localStorage.getItem("recentResearch"));
		}

	/**********************/
	/*      Firstname     */
	/**********************/

		firstnameExists() {
			return typeof localStorage.getItem('firstname') !== "undefined" && localStorage.getItem('firstname') !== null;
		}

		getFirstname() {
			return localStorage.getItem('firstname');
		}

		setFirstname(firstname) {
			localStorage.setItem('firstname', firstname);
		}

	/**********************/
	/*      Maj Items     */
	/**********************/

		getLastMajVersion() {
			return localStorage.getItem('lastMajVersion');
		}

		setLastMajVersion(element) {
			localStorage.setItem('lastMajVersion', element);
		}

		getCurrentApiVersion() {
			return localStorage.getItem('currentApiVersion');
		}

		setCurrentApiVersion(element) {
			return localStorage.setItem('currentApiVersion', element);
		}

		setNextProposalUpdate(element) {
			localStorage.setItem('nextProposalUpdate', element);
		}

		getNextProposalUpdate() {
			return localStorage.getItem('nextProposalUpdate');
		}

		getWaitForProposal() {
			return localStorage.getItem('waitForProposal');
		}

		setWaitForProposal(element) {
			localStorage.setItem('waitForProposal', element);
		}
}
