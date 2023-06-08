import "../config/env.js"
import {ObjectId} from "mongodb";
import db from "./database.js";

const lead1 = {
    description: "# Meeting next week\n\n- Discuss contract details\n- Finalize deal\n\n## Additional Info\nDon't forget to bring the report.\nCall beforehand for confirmation.",
    phone: '+4520676561',
    email: 'andrea.jones@new-tech.com',
    name: 'Andrea Jones',
    category: 'called',
    Type: 'Called for contract details'
}
lead1.id = new ObjectId(123151251231)

db.companies.updateOne({ company_name: 'test-company' }, {
    $push: {
        leads: lead1
    }
}).then(result => {
    console.log(result)
})

const lead2 = {
    description: '# Pending Order\n\nThe client needs to confirm the order details.\nPlan to reach out early next week.',
    phone: '26436413',
    email: 'michael.brown@new-tech.com',
    name: 'Michael Brown',
    category: 'waiting',
    'Low Price': '2000',
    'High Price': '2500'
}
lead2.id = new ObjectId(123112312351251231)
db.companies.updateOne({ company_name: 'test-company' }, {
    $push: {
        leads: lead2
    }
})

const lead3 = {
    description: '# Product Shipment\n\nThe client is waiting for the new product shipment. \nFollow up on the estimated delivery time.',
    phone: '+4520676562',
    email: 'julia.smith@new-tech.com',
    name: 'Julia Smith',
    category: 'waiting'
}
lead3.id = new ObjectId(124125253)
db.companies.updateOne({ company_name: 'test-company' }, {
    $push: {
        leads: lead3
    }
})

const lead4 = {
    description: '# Potential Partnership\n\nThe client wants to discuss a potential partnership.\nSchedule a meeting to explore this opportunity.',
    phone: '452345231',
    email: 'tom.johnson@new-tech.com',
    name: 'Tom Johnson',
    category: 'called'
}
lead4.id = new ObjectId(23423423423)
db.companies.updateOne({ company_name: 'test-company' }, {
    $push: {
        leads: lead4
    }
})

const lead5 = {
    description: '# New Inquiry\n\nThe client has expressed interest in our products. Follow up to gather more details and provide information.',
    phone: '+4520676563',
    email: 'alexander.wilson@new-tech.com',
    name: 'Alexander Wilson',
    category: 'waiting'
};
lead5.id = new ObjectId(2135124234);

db.companies.updateOne({ company_name: 'test-company' }, {
    $push: {
        leads: lead5
    }
});

const lead6 = {
    description: '# Service Upgrade\n\nThe client is considering upgrading their service plan. Offer personalized recommendations and schedule a consultation.',
    phone: '26436414',
    email: 'emma.johnson@new-tech.com',
    name: 'Emma Johnson',
    category: 'called'
};
lead6.id = new ObjectId(234234234234);

db.companies.updateOne({ company_name: 'test-company' }, {
    $push: {
        leads: lead6
    }
});

const lead7 = {
    description: '# Request for Demo\n\nThe client wants to see a live demonstration of our product. Arrange a demo session and address any specific requirements.',
    phone: '+4520676564',
    email: 'david.wilson@new-tech.com',
    name: 'David Wilson',
    category: 'waiting'
};
lead7.id = new ObjectId(654456);

db.companies.updateOne({ company_name: 'test-company' }, {
    $push: {
        leads: lead7
    }
});

const lead8 = {
    description: '# Event Participation\n\nThe client has shown interest in attending our upcoming event. Provide event details and assist with registration.',
    phone: '452345232',
    email: 'olivia.smith@new-tech.com',
    name: 'Olivia Smith',
    category: 'waiting'
};
lead8.id = new ObjectId(456456456);

db.companies.updateOne({ company_name: 'test-company' }, {
    $push: {
        leads: lead8
    }
});
