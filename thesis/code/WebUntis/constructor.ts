constructor(school, username, password, baseurl, identity = 'Awesome', disableUserAgent = false) {
    this.school = school;
    this.schoolbase64 = '_' + Base64.btoa(this.school);
    this.username = username;
    this.password = password;
    this.baseurl = 'https://' + baseurl + '/';
    this.cookies = [];
    this.id = identity;
    this.sessionInformation = {};
    this.anonymous = false;
}