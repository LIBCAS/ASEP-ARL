/**
 * Zabalení do ZIPu
 * @see https://github.com/twolfson/grunt-zip

 */
module.exports = {
	myweb: {
		cwd: '../www/',
		dest: "../www/backup.zip",
		src: ["../www/config/*.*", "../www/app/*.*", "../www/app/*/*.*", "../www/app/*/*/*.*"]
	}
};