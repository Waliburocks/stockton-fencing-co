import fs from 'fs';
import path from 'path';

const locations = [
  {
    name: 'Modesto',
    slug: 'modesto',
    lat: 37.6391,
    lng: -120.9969,
    zip: '95350',
    tagline: 'Stanislaus County\'s Largest City',
    unique: 'City of Water Wealth Contentment Health, agricultural center, E&J Gallo headquarters',
    neighborhoods: ['La Loma', 'Village One', 'Downey', 'College Area', 'West Modesto', 'Airport Neighborhood'],
    employers: ['E&J Gallo Winery', 'Memorial Medical Center', 'Doctors Medical Center', 'Modesto City Schools', 'Stanislaus County Government'],
    population: '218,000+'
  },
  {
    name: 'Turlock',
    slug: 'turlock',
    lat: 37.4947,
    lng: -120.8466,
    zip: '95380',
    tagline: 'Heart of the Valley',
    unique: 'Foster Farms headquarters, CSU Stanislaus, dairy capital, agricultural processing center',
    neighborhoods: ['Downtown Turlock', 'CSU Stanislaus Area', 'Countryside', 'North Turlock', 'Walnut Acres', 'Crowell Industrial Park'],
    employers: ['Foster Farms', 'California State University Stanislaus', 'Emanuel Medical Center', 'Turlock Unified School District', 'Hilmar Cheese Company'],
    population: '73,000+'
  },
  {
    name: 'Riverbank',
    slug: 'riverbank',
    lat: 37.7360,
    lng: -120.9355,
    zip: '95367',
    tagline: 'City of Action',
    unique: 'Youth sports destination, Stanislaus River recreation, small-town community, affordable housing',
    neighborhoods: ['Downtown Riverbank', 'Riverbank Sports Complex Area', 'Stanislaus River Corridor', 'North Riverbank', 'Oakdale Road Corridor', 'Residential Districts'],
    employers: ['Riverbank Unified School District', 'City of Riverbank', 'Local agricultural operations', 'Retail businesses', 'Healthcare services'],
    population: '25,000+'
  },
  {
    name: 'Oakdale',
    slug: 'oakdale',
    lat: 37.7666,
    lng: -120.8471,
    zip: '95361',
    tagline: 'Cowboy Capital of the World',
    unique: 'Rodeo heritage, western character, Oakdale Rodeo, small-town charm, gateway to Yosemite',
    neighborhoods: ['Historic Downtown Oakdale', 'North Oakdale', 'East Oakdale', 'Rodeo Grounds Area', 'South Oakdale', 'Rural Properties'],
    employers: ['Oakdale Joint Unified School District', 'Hershey Company (Oakdale)', 'Oak Valley Hospital District', 'Local ranches and farms', 'Tourism and retail'],
    population: '23,000+'
  },
  {
    name: 'Ceres',
    slug: 'ceres',
    lat: 37.5950,
    lng: -120.9577,
    zip: '95307',
    tagline: 'Working-Class Heart of Stanislaus County',
    unique: 'Agricultural heritage, affordable housing, working-class community, family-oriented',
    neighborhoods: ['Central Ceres', 'East Ceres', 'West Ceres', 'Whitmore Avenue Corridor', 'Mitchell Road Area', 'Service Road District'],
    employers: ['Ceres Unified School District', 'Food processing facilities', 'Manufacturing operations', 'Local agriculture', 'Retail and services'],
    population: '49,000+'
  },
  {
    name: 'Newman',
    slug: 'newman',
    lat: 37.3138,
    lng: -121.0205,
    zip: '95360',
    tagline: 'Small Town Agricultural Community',
    unique: 'I-5 corridor location, farming community, rural character, tight-knit community',
    neighborhoods: ['Downtown Newman', 'North Newman', 'South Newman', 'East Newman', 'West Newman Agricultural', 'I-5 Corridor'],
    employers: ['Newman-Crows Landing Unified School District', 'Agricultural operations', 'Food processing', 'I-5 corridor businesses', 'Local government'],
    population: '11,000+'
  },
  {
    name: 'Patterson',
    slug: 'patterson',
    lat: 37.4716,
    lng: -121.1296,
    zip: '95363',
    tagline: 'Apricot Capital of the World',
    unique: 'Agricultural heritage, Del Monte facility, apricot processing, I-5 corridor, growing community',
    neighborhoods: ['Downtown Patterson', 'North Patterson', 'Sperry Avenue Corridor', 'Las Palmas', 'Keystone Pacific', 'I-5 Industrial Area'],
    employers: ['Patterson Joint Unified School District', 'Del Monte Foods', 'Agricultural operations', 'Food processing facilities', 'Distribution centers'],
    population: '23,000+'
  },
  {
    name: 'Livermore',
    slug: 'livermore',
    lat: 37.6819,
    lng: -121.7680,
    zip: '94550',
    tagline: 'Wine Country Meets Innovation',
    unique: 'Lawrence Livermore National Laboratory, wine region, tech hub, Tri-Valley area',
    neighborhoods: ['Downtown Livermore', 'South Livermore Wine Country', 'North Livermore', 'East Livermore', 'Junction Avenue District', 'Isabel Area'],
    employers: ['Lawrence Livermore National Laboratory', 'Sandia National Laboratories', 'Livermore Valley Joint Unified School District', 'Stanford Health Care - ValleyCare', 'Wine industry'],
    population: '90,000+'
  },
  {
    name: 'Dublin',
    slug: 'dublin',
    lat: 37.7022,
    lng: -121.9358,
    zip: '94568',
    tagline: 'Tri-Valley\'s Fastest Growing City',
    unique: 'Master-planned communities, tech corridor, BART access, excellent schools, family-oriented',
    neighborhoods: ['Dublin Ranch', 'Schaefer Ranch', 'Emerald Glen', 'Fallon Gateway', 'Downtown Dublin', 'East Dublin'],
    employers: ['Synnex Corporation', 'Dublin Unified School District', 'Kaiser Permanente', 'ValleyCare Health System', 'Technology companies'],
    population: '72,000+'
  },
  {
    name: 'Pleasanton',
    slug: 'pleasanton',
    lat: 37.6624,
    lng: -121.8747,
    zip: '94588',
    tagline: 'Affluent Tri-Valley Community',
    unique: 'High-income area, excellent schools, corporate headquarters, downtown charm, family-friendly',
    neighborhoods: ['Downtown Pleasanton', 'Ruby Hill', 'Mohr Park', 'Vintage Hills', 'Kottinger Ranch', 'Ironwood'],
    employers: ['Workday', 'Safeway headquarters', 'Roche Molecular Diagnostics', 'Kaiser Permanente', 'Pleasanton Unified School District'],
    population: '79,000+'
  },
  {
    name: 'Antioch',
    slug: 'antioch',
    lat: 38.0049,
    lng: -121.8058,
    zip: '94509',
    tagline: 'Delta Waterfront Community',
    unique: 'San Joaquin River delta, waterfront living, affordable Bay Area alternative, diverse community',
    neighborhoods: ['Historic Downtown Antioch', 'Deer Valley', 'Lone Tree', 'Hillcrest', 'Somersville', 'Rivertown'],
    employers: ['Kaiser Permanente Antioch Medical Center', 'Antioch Unified School District', 'Sutter Delta Medical Center', 'City of Antioch', 'Retail and services'],
    population: '115,000+'
  },
  {
    name: 'Pittsburg',
    slug: 'pittsburg',
    lat: 38.0280,
    lng: -121.8847,
    zip: '94565',
    tagline: 'Industrial Heart of East Contra Costa',
    unique: 'Deep-water port, industrial center, delta access, diverse community, waterfront development',
    neighborhoods: ['Downtown Pittsburg', 'Los Medanos', 'Stoneman Village', 'Marina Area', 'Hillview Crest', 'Century Plaza'],
    employers: ['U.S. Steel (formerly)', 'Los Medanos College', 'Pittsburg Unified School District', 'Port of Pittsburg', 'Manufacturing and logistics'],
    population: '76,000+'
  }
];

const template = (loc) => `---
import Layout from '../../layouts/Layout.astro';
---

<Layout
	title="Professional Fence Installation ${loc.name} CA | Top-Rated Local Contractors | Free Estimates"
	description="Expert fence installation in ${loc.name}, CA. Serving all neighborhoods with wood, vinyl, chain link & iron fencing. Licensed, insured contractors. Free estimates!"
	canonicalUrl="/locations/${loc.slug}">

	<script type="application/ld+json" slot="head">
	{
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		"@id": "https://sacramento-fencing.co/locations/${loc.slug}",
		"name": "Sacramento Fencing Co. - ${loc.name} Location",
		"description": "Professional fence installation and repair services in ${loc.name}, CA",
		"url": "https://sacramento-fencing.co/locations/${loc.slug}",
		"telephone": "+1-888-682-0507",
		"address": {
			"@type": "PostalAddress",
			"addressLocality": "${loc.name}",
			"addressRegion": "CA",
			"postalCode": "${loc.zip}",
			"addressCountry": "US"
		},
		"geo": {
			"@type": "GeoCoordinates",
			"latitude": ${loc.lat},
			"longitude": ${loc.lng}
		},
		"areaServed": {
			"@type": "City",
			"name": "${loc.name}",
			"addressRegion": "CA"
		},
		"serviceArea": {
			"@type": "GeoCircle",
			"geoMidpoint": {
				"@type": "GeoCoordinates",
				"latitude": ${loc.lat},
				"longitude": ${loc.lng}
			},
			"geoRadius": "25000"
		},
		"openingHours": "Mo-Fr 07:00-18:00, Sa 08:00-16:00"
	}
	</script>

	<section class="hero">
		<div class="hero-image-container">
			<picture class="hero-picture">
				<source srcset="/images/hero-fencing-professional.webp" type="image/webp">
				<img src="/images/hero-fencing-professional.webp" alt="Professional fence installation in ${loc.name} California" class="hero-image" loading="eager" width="1200" height="400" />
			</picture>
			<div class="hero-overlay">
				<div class="hero-content">
					<h1>Professional Fence Installation in ${loc.name}, CA</h1>
					<p class="hero-subtitle">${loc.tagline} - Your trusted local fencing contractors serving all ${loc.name} neighborhoods</p>
					<div class="hero-buttons">
						<a href="tel:888-682-0507" class="btn btn-quote">Get Free Quote Today!</a>
						<a href="#services" class="btn btn-outline">View Our Services</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="location-intro">
		<div class="container">
			<div class="intro-grid">
				<div class="intro-content">
					<h2>${loc.name}'s Premier Fencing Company</h2>
					<p>As ${loc.name}'s leading fence installation company, we've been proudly serving the community with professional fencing solutions. Our team of licensed and insured fence contractors specializes in residential and commercial fencing that enhances security, privacy, and property value throughout the area.</p>

					<p>${loc.unique}. We understand the unique character of ${loc.name} and deliver fencing solutions tailored to local needs, climate conditions, and community standards.</p>

					<p>Every fence we install is designed to withstand California's Central Valley climate. We use only premium materials specifically selected for local conditions, ensuring your investment lasts for decades.</p>

					<div class="quick-stats">
						<div class="stat">
							<span class="stat-number">${loc.population}</span>
							<span class="stat-label">Residents Served</span>
						</div>
						<div class="stat">
							<span class="stat-number">24hr</span>
							<span class="stat-label">Emergency Response</span>
						</div>
						<div class="stat">
							<span class="stat-number">100%</span>
							<span class="stat-label">Satisfaction Guarantee</span>
						</div>
					</div>
				</div>
				<div class="intro-image">
					<img src="/images/wood-fence-photo.webp" alt="Professional fence installation team in ${loc.name} CA" loading="lazy" width="500" height="400" />
				</div>
			</div>
		</div>
	</section>

	<section class="services-${loc.slug}" id="services">
		<div class="container">
			<h2>Complete Fencing Services in ${loc.name}</h2>
			<div class="services-grid">
				<div class="service-item">
					<img src="/images/wood-fence-photo.webp" alt="Wood fence installation in ${loc.name} CA" loading="lazy" width="300" height="200" />
					<h3>Wood Fence Installation</h3>
					<p>Premium cedar, redwood, and pressure-treated pine fencing options perfect for ${loc.name}'s climate. Our wood fences combine natural beauty with lasting durability.</p>
					<div class="service-features">
						<span class="feature">Cedar & Redwood Options</span>
						<span class="feature">Custom Staining Available</span>
						<span class="feature">10-Year Warranty</span>
					</div>
					<a href="/services/wood-fence" class="service-link">Learn More →</a>
				</div>

				<div class="service-item">
					<img src="/images/vinyl-fence-photo.webp" alt="Vinyl fence installation in ${loc.name} CA" loading="lazy" width="300" height="200" />
					<h3>Vinyl Fence Installation</h3>
					<p>Maintenance-free vinyl fencing that withstands Central Valley weather. Available in multiple colors and styles with lifetime warranties.</p>
					<div class="service-features">
						<span class="feature">Lifetime Warranty</span>
						<span class="feature">Multiple Colors</span>
						<span class="feature">No Maintenance Required</span>
					</div>
					<a href="/services/vinyl-fence" class="service-link">Learn More →</a>
				</div>

				<div class="service-item">
					<img src="/images/chain-link-fence-photo.webp" alt="Chain link fence installation in ${loc.name} CA" loading="lazy" width="300" height="200" />
					<h3>Chain Link Fencing</h3>
					<p>Affordable and durable chain link fencing for residential and commercial properties in ${loc.name}. Galvanized and vinyl-coated options available.</p>
					<div class="service-features">
						<span class="feature">Galvanized Protection</span>
						<span class="feature">Privacy Slats Available</span>
						<span class="feature">Commercial Grade</span>
					</div>
					<a href="/services/chain-link-fence" class="service-link">Learn More →</a>
				</div>

				<div class="service-item">
					<img src="/images/iron-fence-photo.webp" alt="Iron fence installation in ${loc.name} CA" loading="lazy" width="300" height="200" />
					<h3>Iron & Aluminum Fencing</h3>
					<p>Elegant ornamental iron and aluminum fencing that combines security with sophisticated aesthetics. Perfect for ${loc.name}'s upscale properties.</p>
					<div class="service-features">
						<span class="feature">Custom Ornamental Designs</span>
						<span class="feature">Powder-Coated Finish</span>
						<span class="feature">Enhanced Security</span>
					</div>
					<a href="/services/iron-fence" class="service-link">Learn More →</a>
				</div>
			</div>
		</div>
	</section>

	<section class="neighborhoods-served" id="neighborhoods">
		<div class="container">
			<h2>${loc.name} Neighborhoods We Serve</h2>
			<p class="section-intro">We provide comprehensive fence installation and repair services throughout all ${loc.name} neighborhoods and surrounding areas:</p>
			<div class="neighborhoods-grid">
				${loc.neighborhoods.map((n, i) => `<div class="neighborhood-card">
					<h3>${n}</h3>
					<img src="/images/hero-fencing-professional.webp" alt="Fence installation in ${n}" loading="lazy" width="350" height="250" />
					<p>Professional fencing services for ${n} residents and businesses. Custom solutions that meet local needs and enhance property value.</p>
				</div>`).join('\n\t\t\t\t')}
			</div>
		</div>
	</section>

	<section class="major-employers">
		<div class="container">
			<h2>Trusted by ${loc.name}'s Community</h2>
			<div class="employers-content">
				<p>We're proud to provide fencing services to ${loc.name}'s residents and businesses, including employees from major local employers:</p>
				<div class="employers-list">
					${loc.employers.map(e => `<div class="employer-item"><strong>•</strong> ${e}</div>`).join('\n\t\t\t\t\t')}
				</div>
			</div>
		</div>
	</section>

	<section class="local-knowledge">
		<div class="container">
			<h2>Local ${loc.name} Expertise</h2>
			<div class="knowledge-grid">
				<div class="knowledge-card">
					<div class="knowledge-icon">📋</div>
					<h3>Permit Requirements</h3>
					<p>We handle all ${loc.name} permit applications and know exactly which projects require permits. Our relationships with local planning departments ensure smooth approvals.</p>
				</div>

				<div class="knowledge-card">
					<div class="knowledge-icon">🌱</div>
					<h3>Climate Expertise</h3>
					<p>Years of working with ${loc.name}'s specific climate conditions. We adjust installation methods based on local soil, weather patterns, and seasonal variations.</p>
				</div>

				<div class="knowledge-card">
					<div class="knowledge-icon">🛡️</div>
					<h3>Quality Materials</h3>
					<p>Strong relationships with regional suppliers ensure competitive pricing and quick availability. We source materials specifically rated for California conditions.</p>
				</div>

				<div class="knowledge-card">
					<div class="knowledge-icon">⚡</div>
					<h3>Fast Response</h3>
					<p>Local ${loc.name} presence means faster response times for estimates, installations, and emergency repairs. We're your neighbors serving neighbors.</p>
				</div>
			</div>
		</div>
	</section>

	<section class="cta">
		<div class="container">
			<h2>Ready to Start Your ${loc.name} Fencing Project?</h2>
			<p>Contact us today for a free estimate. We're local, licensed, and ready to help with any fencing need in ${loc.name} and surrounding areas.</p>
			<div class="cta-buttons">
				<a href="tel:888-682-0507" class="btn btn-quote">Call Now: (888) 682-0507</a>
				<a href="/contact" class="btn btn-outline">Schedule Free Estimate</a>
			</div>
		</div>
	</section>
</Layout>

<style>
	.hero {
		position: relative;
		min-height: 400px;
		overflow: hidden;
		display: flex;
		align-items: center;
	}

	.hero-image-container {
		position: relative;
		width: 100%;
		height: 400px;
		overflow: hidden;
	}

	.hero-picture {
		width: 100%;
		height: 100%;
		display: block;
	}

	.hero-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		display: block;
	}

	.hero-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg,
			rgba(89, 123, 148, 0.85) 0%,
			rgba(70, 98, 117, 0.9) 100%
		);
		display: flex;
		align-items: center;
	}

	.hero-content {
		text-align: center;
		color: var(--white);
		z-index: 2;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.hero h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
		font-weight: 700;
		text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
	}

	.hero p {
		font-size: 1.2rem;
		text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
	}

	.hero-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 2rem;
	}

	.hero-subtitle {
		font-size: 1.2rem;
		text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
		margin-bottom: 2rem;
	}

	.location-intro {
		padding: 5rem 0;
		background: var(--background-light);
	}

	.intro-grid {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 3rem;
		align-items: center;
	}

	.intro-content h2 {
		font-size: 2.5rem;
		color: var(--text-dark);
		margin-bottom: 1.5rem;
	}

	.intro-content p {
		font-size: 1.1rem;
		line-height: 1.7;
		margin-bottom: 1.5rem;
		color: var(--text-medium);
	}

	.intro-image img {
		width: 100%;
		border-radius: 15px;
		box-shadow: 0 8px 30px var(--shadow-medium);
	}

	.quick-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
		margin-top: 3rem;
	}

	.stat {
		text-align: center;
	}

	.stat-number {
		display: block;
		font-size: 2.5rem;
		font-weight: bold;
		color: var(--primary-blue);
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 1.1rem;
		color: var(--text-light);
		font-weight: 600;
	}

	section:not(.hero) {
		padding: 5rem 2rem;
	}

	section:nth-child(even) {
		background: var(--background-light);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	h2 {
		text-align: center;
		font-size: 2.5rem;
		color: var(--text-dark);
		margin-bottom: 3rem;
	}

	.section-intro {
		text-align: center;
		font-size: 1.1rem;
		color: var(--text-medium);
		max-width: 800px;
		margin: 0 auto 3rem auto;
		line-height: 1.6;
	}

	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.service-item {
		background: var(--white);
		border-radius: 15px;
		overflow: hidden;
		box-shadow: 0 5px 20px var(--shadow-light);
		transition: transform 0.3s ease;
	}

	.service-item:hover {
		transform: translateY(-5px);
	}

	.service-item img {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}

	.service-item h3 {
		font-size: 1.3rem;
		color: var(--text-dark);
		margin: 1.5rem 1.5rem 1rem 1.5rem;
	}

	.service-item p {
		padding: 0 1.5rem;
		color: var(--text-medium);
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	.service-features {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding: 0 1.5rem;
		margin-bottom: 1.5rem;
	}

	.feature {
		background: var(--primary-blue);
		color: var(--white);
		padding: 0.2rem 0.8rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 500;
	}

	.service-link {
		display: block;
		text-align: center;
		padding: 1rem;
		background: var(--primary-blue);
		color: var(--white);
		text-decoration: none;
		font-weight: bold;
		transition: background 0.3s ease;
	}

	.service-link:hover {
		background: var(--secondary-blue);
	}

	.neighborhoods-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.neighborhood-card {
		background: var(--white);
		border-radius: 15px;
		overflow: hidden;
		box-shadow: 0 5px 20px var(--shadow-light);
		transition: transform 0.3s ease;
	}

	.neighborhood-card:hover {
		transform: translateY(-5px);
	}

	.neighborhood-card img {
		width: 100%;
		height: 250px;
		object-fit: cover;
	}

	.neighborhood-card h3 {
		font-size: 1.4rem;
		color: var(--text-dark);
		margin: 1.5rem 1.5rem 1rem 1.5rem;
	}

	.neighborhood-card p {
		padding: 0 1.5rem 1.5rem 1.5rem;
		color: var(--text-medium);
		line-height: 1.6;
	}

	.employers-content p {
		text-align: center;
		font-size: 1.1rem;
		max-width: 800px;
		margin: 0 auto 2rem auto;
	}

	.employers-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1rem;
	}

	.employer-item {
		background: var(--white);
		padding: 1rem 1.5rem;
		border-radius: 8px;
		border-left: 4px solid var(--primary-blue);
	}

	.employer-item strong {
		color: var(--primary-blue);
		margin-right: 0.5rem;
	}

	.knowledge-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
	}

	.knowledge-card {
		background: var(--white);
		padding: 2.5rem 2rem;
		border-radius: 15px;
		text-align: center;
		box-shadow: 0 5px 20px var(--shadow-light);
		transition: transform 0.3s ease;
		border-top: 4px solid var(--primary-blue);
	}

	.knowledge-card:hover {
		transform: translateY(-8px);
		border-top-color: var(--accent-orange);
	}

	.knowledge-icon {
		font-size: 3rem;
		margin-bottom: 1.5rem;
	}

	.knowledge-card h3 {
		color: var(--text-dark);
		margin-bottom: 1rem;
		font-size: 1.3rem;
	}

	.knowledge-card p {
		color: var(--text-light);
		line-height: 1.6;
	}

	.cta {
		background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
		color: var(--white);
		text-align: center;
	}

	.cta h2 {
		color: white;
		font-size: 2.5rem;
		margin-bottom: 1rem;
		text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
	}

	.cta p {
		font-size: 1.25rem;
		margin-bottom: 2rem;
		text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
	}

	.cta-buttons {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn-outline {
		background: transparent;
		border: 2px solid var(--white);
		color: var(--white);
		padding: 1rem 2rem;
		text-decoration: none;
		border-radius: 5px;
		font-weight: bold;
		transition: all 0.3s ease;
	}

	.btn-outline:hover {
		background: var(--white);
		color: var(--primary-blue);
	}

	.btn-quote {
		background: linear-gradient(135deg, #FF6B35 0%, #FF4500 100%) !important;
		color: var(--white) !important;
		font-weight: bold !important;
		font-size: 1.1rem !important;
		padding: 1rem 2rem !important;
		text-transform: uppercase !important;
		letter-spacing: 0.5px !important;
		box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3) !important;
		border: none !important;
		border-radius: 5px;
		text-decoration: none;
		display: inline-block;
		transition: all 0.3s ease;
	}

	.btn-quote:hover {
		background: linear-gradient(135deg, #FF4500 0%, #FF6B35 100%) !important;
		transform: translateY(-3px) scale(1.05) !important;
		box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4) !important;
	}

	@media (max-width: 768px) {
		.hero h1 {
			font-size: 2.2rem;
		}

		.hero-buttons {
			flex-direction: column;
			align-items: center;
		}

		.intro-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.quick-stats {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.neighborhoods-grid,
		.services-grid,
		.knowledge-grid,
		.employers-list {
			grid-template-columns: 1fr;
		}

		h2 {
			font-size: 2rem;
		}

		.cta-buttons {
			flex-direction: column;
			align-items: center;
		}
	}
</style>
`;

// Generate all files
const outputDir = './src/pages/locations';

locations.forEach(loc => {
  const content = template(loc);
  const filename = path.join(outputDir, `${loc.slug}.astro`);
  fs.writeFileSync(filename, content);
  console.log(`✅ Created ${filename}`);
});

console.log(`\n🎉 Successfully generated ${locations.length} location pages!`);
