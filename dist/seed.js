"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const typeorm_1 = require("typeorm");
const page_entity_1 = require("./pages/entities/page.entity");
const section_entity_1 = require("./sections/entities/section.entity");
const admin_entity_1 = require("./auth/entities/admin.entity");
const bcrypt = __importStar(require("bcrypt"));
async function seed() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const dataSource = app.get(typeorm_1.DataSource);
    const pageRepo = dataSource.getRepository(page_entity_1.Page);
    const sectionRepo = dataSource.getRepository(section_entity_1.Section);
    const adminRepo = dataSource.getRepository(admin_entity_1.Admin);
    const existingAdmin = await adminRepo.findOne({ where: { email: 'admin@urbanpixora.com' } });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await adminRepo.save(adminRepo.create({
            name: 'Admin',
            email: 'admin@urbanpixora.com',
            password: hashedPassword,
            role: 'super_admin',
        }));
        console.log('✅ Default admin created: admin@urbanpixora.com / admin123');
    }
    const pagesData = [
        { slug: 'home', title: 'Home', meta_title: 'UrbanPixora - Creative Digital Agency', meta_description: 'UrbanPixora provides web development, branding, and design services.', is_published: true },
        { slug: 'about', title: 'About', meta_title: 'About UrbanPixora', meta_description: 'Learn more about UrbanPixora and our team.', is_published: true },
        { slug: 'services', title: 'Services', meta_title: 'Our Services - UrbanPixora', meta_description: 'Explore our web development, branding, and design services.', is_published: true },
        { slug: 'portfolio', title: 'Portfolio', meta_title: 'Portfolio - UrbanPixora', meta_description: 'View our latest projects and case studies.', is_published: true },
        { slug: 'contact', title: 'Contact', meta_title: 'Contact UrbanPixora', meta_description: 'Get in touch with us for your next project.', is_published: true },
    ];
    for (const pageData of pagesData) {
        const existing = await pageRepo.findOne({ where: { slug: pageData.slug } });
        if (!existing) {
            await pageRepo.save(pageRepo.create(pageData));
            console.log(`✅ Page "${pageData.slug}" created.`);
        }
    }
    const homePage = await pageRepo.findOne({ where: { slug: 'home' } });
    if (homePage) {
        const homeSections = [
            {
                type: 'hero',
                name: 'Hero Section',
                order: 0,
                fields: {
                    title: 'We Build Digital Experiences',
                    subtitle: 'Creative Agency',
                    description: 'UrbanPixora is a creative digital agency that builds stunning websites, brands, and digital products.',
                    background_image: '',
                },
                items: [
                    { label: 'Start a Project', url: '/contact', style: 'primary' },
                    { label: 'View Our Work', url: '/portfolio', style: 'secondary' },
                ],
            },
            {
                type: 'services',
                name: 'Services Section',
                order: 1,
                fields: {
                    title: 'Our Services',
                    subtitle: 'What We Do',
                    description: 'We provide a range of digital services to help your business grow.',
                },
                items: [
                    { icon: 'code', title: 'Web Development', description: 'Custom websites built with modern technologies.' },
                    { icon: 'palette', title: 'Branding', description: 'Create a strong brand identity for your business.' },
                    { icon: 'devices', title: 'UI/UX Design', description: 'User-centered design that converts visitors to customers.' },
                    { icon: 'campaign', title: 'Digital Marketing', description: 'SEO, social media, and content marketing strategies.' },
                ],
            },
            {
                type: 'portfolio',
                name: 'Portfolio Section',
                order: 2,
                fields: {
                    title: 'Our Work',
                    subtitle: 'Featured Projects',
                    description: 'A selection of our recent projects.',
                },
                items: [
                    { title: 'E-Commerce Platform', category: 'Web Development', image: '', url: '/portfolio/ecommerce' },
                    { title: 'Brand Identity', category: 'Branding', image: '', url: '/portfolio/brand-identity' },
                    { title: 'Mobile App', category: 'UI/UX Design', image: '', url: '/portfolio/mobile-app' },
                ],
            },
            {
                type: 'testimonials',
                name: 'Testimonials Section',
                order: 3,
                fields: {
                    title: 'What Our Clients Say',
                    subtitle: 'Testimonials',
                },
                items: [
                    { name: 'John Doe', role: 'CEO, TechCorp', avatar: '', quote: 'UrbanPixora delivered an amazing website that exceeded our expectations.' },
                    { name: 'Jane Smith', role: 'Marketing Director', avatar: '', quote: 'Their branding work completely transformed our business image.' },
                ],
            },
            {
                type: 'cta',
                name: 'CTA Section',
                order: 4,
                fields: {
                    title: 'Ready to Start Your Project?',
                    description: 'Let us bring your ideas to life. Contact us today for a free consultation.',
                },
                items: [
                    { label: 'Get in Touch', url: '/contact', style: 'primary' },
                ],
            },
        ];
        for (const sectionData of homeSections) {
            const exists = await sectionRepo.findOne({
                where: { page: { id: homePage.id }, type: sectionData.type },
            });
            if (!exists) {
                await sectionRepo.save(sectionRepo.create({ ...sectionData, page: homePage }));
                console.log(`  ✅ Home → "${sectionData.type}" section created.`);
            }
        }
    }
    const aboutPage = await pageRepo.findOne({ where: { slug: 'about' } });
    if (aboutPage) {
        const aboutSections = [
            {
                type: 'hero',
                name: 'About Hero',
                order: 0,
                fields: {
                    title: 'About UrbanPixora',
                    description: 'We are a team of passionate designers and developers building digital solutions.',
                    background_image: '',
                },
                items: [],
            },
            {
                type: 'team',
                name: 'Team Section',
                order: 1,
                fields: {
                    title: 'Meet Our Team',
                    subtitle: 'The People Behind UrbanPixora',
                },
                items: [
                    { name: 'Alex Johnson', role: 'Founder & CEO', avatar: '', bio: 'Visionary leader with 10+ years in digital.' },
                    { name: 'Sarah Williams', role: 'Lead Designer', avatar: '', bio: 'Award-winning designer specializing in UI/UX.' },
                    { name: 'Mike Chen', role: 'Lead Developer', avatar: '', bio: 'Full-stack expert with a passion for clean code.' },
                ],
            },
        ];
        for (const sectionData of aboutSections) {
            const exists = await sectionRepo.findOne({
                where: { page: { id: aboutPage.id }, type: sectionData.type },
            });
            if (!exists) {
                await sectionRepo.save(sectionRepo.create({ ...sectionData, page: aboutPage }));
                console.log(`  ✅ About → "${sectionData.type}" section created.`);
            }
        }
    }
    const contactPage = await pageRepo.findOne({ where: { slug: 'contact' } });
    if (contactPage) {
        const contactSections = [
            {
                type: 'contact-info',
                name: 'Contact Info',
                order: 0,
                fields: {
                    title: 'Get in Touch',
                    description: 'Have a project in mind? Let us know!',
                    email: 'hello@urbanpixora.com',
                    phone: '+1 (555) 123-4567',
                    address: '123 Creative Street, Design City, DC 10001',
                },
                items: [],
            },
        ];
        for (const sectionData of contactSections) {
            const exists = await sectionRepo.findOne({
                where: { page: { id: contactPage.id }, type: sectionData.type },
            });
            if (!exists) {
                await sectionRepo.save(sectionRepo.create({ ...sectionData, page: contactPage }));
                console.log(`  ✅ Contact → "${sectionData.type}" section created.`);
            }
        }
    }
    console.log('\n🎉 Database seeding complete!');
    await app.close();
}
seed().catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map