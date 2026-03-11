const homeRepository = require("../db/homeRepository");
const { buildDummyHomeData } = require("../data/dummyHomeData");
const response = require("../utils/response");

function home(req, res) {
    let home = homeRepository.findByUserId(req.user.id);
    if (!home) {
        home = buildDummyHomeData(req.user);
        homeRepository.create(req.user.id, home);
    }
    return response.success(res, 200, { home }, "Fetched home data");
}

module.exports = {
    home,
};
