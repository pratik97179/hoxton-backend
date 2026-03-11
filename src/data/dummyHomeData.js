/**
 * Builds a dummy/mock home payload for a user (e.g. new users or demo).
 * @param {object} user - User object (id, email, name); may be unused in mock data.
 * @returns {object} Home data shape for the API.
 */
function buildDummyHomeData(user) {
    const currency = "USD";

    return {
        netWorth: {
            currentValue: 12500000.0,
            currency,
            changeAmount: 254875.69,
            changePercent: 0.068,
            changeDirection: "up",
            changePeriod: "MTD",
            lastUpdated: new Date().toISOString(),
        },
        netWorthChart: {
            selectedRange: "oneMonth",
            availableRanges: [
                "oneWeek",
                "oneMonth",
                "threeMonths",
                "oneYear",
                "ytd",
                "max",
            ],
            points: [
                { date: new Date().toISOString(), value: 12000000.0 },
                { date: new Date().toISOString(), value: 12250000.0 },
                { date: new Date().toISOString(), value: 12375000.0 },
                { date: new Date().toISOString(), value: 12500000.0 },
            ],
        },
        summaryTabs: {
            assetsTotal: { amount: 50000000.0, currency },
            liabilitiesTotal: { amount: 0.0, currency },
        },
        assets: [
            {
                id: "cash-accounts",
                name: "Cash Accounts",
                balance: { amount: 0.0, currency },
                actionType: "add",
                actionRoute: "/assets/cash/add",
            },
            {
                id: "investments",
                name: "Investments",
                balance: { amount: 40000000.0, currency },
                actionType: "navigate",
                actionRoute: "/assets/investments",
            },
            {
                id: "pensions",
                name: "Pensions",
                balance: { amount: 4000000.0, currency },
                actionType: "navigate",
                actionRoute: "/assets/pensions",
            },
            {
                id: "properties",
                name: "Properties",
                balance: { amount: 0.0, currency },
                actionType: "add",
                actionRoute: "/assets/properties/add",
            },
        ],
        liabilities: [],
        liabilitiesEmptyMessage:
            "You currently have no liabilities added to your profile.",
        featureCards: [
            {
                id: "wealthflow-forecast",
                title: "Forecast Your Financial Future with WealthFlow",
                subtitle:
                    "See how your wealth could grow over time. WealthFlow helps you forecast future projections based on your assets, growth assumptions, and inflation trends.",
                primaryActionLabel: "Create Wealth Forecast",
                primaryActionRoute: "/wealthflow/forecast",
                iconUrl: "",
            },
            {
                id: "watchlist",
                title: "Your Watchlist",
                subtitle:
                    "Track stocks, ETFs, crypto, and currencies all in one place. Stay updated with market shifts.",
                primaryActionLabel: "Start Tracking",
                primaryActionRoute: "/watchlist",
                iconUrl: "",
            },
        ],
        serviceTiles: [
            {
                id: "services",
                title: "Services",
                subtitle:
                    "Speak with an expert to receive help in achieving your goals",
                iconUrl: "",
                actionRoute: "/services",
            },
            {
                id: "vault",
                title: "Vault",
                subtitle:
                    "Store your documents securely; only you can access them",
                iconUrl: "",
                actionRoute: "/vault",
            },
        ],
        featuredArticle: {
            id: "how-to-maximise-your-401k",
            title: "How to Maximise Your 401(k) Contributions Throughout the Tax Year",
            imageUrl: "",
            articleRoute: "/articles/how-to-maximise-your-401k",
            category: "Retirement",
            publishedAt: new Date().toISOString(),
            readTimeMinutes: 5,
        },
    };
}

module.exports = {
    buildDummyHomeData,
};
