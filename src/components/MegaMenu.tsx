import React, { useState } from 'react';
import { 
  Car, 
  Factory, 
  Cpu, 
  Shirt,
  Building2,
  Plane,
  UtensilsCrossed,
  Microscope,
  Palette,
  Diamond,
  ChevronRight,
  Sparkles,
  Sun,
  Stethoscope,
  Baby,
  Tractor,
  Package,
  Lock,
  Droplet,
  Wrench,
  Sofa
} from 'lucide-react';

const categories = [
  {
    name: 'Automotive Industry',
    icon: Car,
    image: '/automotive.jpg', 
    subcategories: [
      { name: 'Mercedes-Benz', products: ['S-Class Sedan - Luxury sedan with advanced safety', 'GLC SUV - Robust for tough terrains', 'EQS Electric - High-performance EV', 'AMG GT - Sports car excellence', 'Sprinter Van - Reliable logistics van'] },
      { name: 'BMW', products: ['7 Series - Premium sedan with cutting-edge tech', 'X5 SUV - Durable luxury SUV', 'i4 Electric - Efficient EV', 'M3 Competition - High-performance car', '3 Series - Affordable luxury sedan'] },
      { name: 'Volkswagen', products: ['Golf - Fuel-efficient compact', 'Tiguan - Family SUV', 'ID.3 Electric - Affordable EV', 'Passat - Spacious business sedan', 'Polo - Budget-friendly hatchback'] },
      { name: 'Audi', products: ['A8 - Luxury sedan with innovative tech', 'Q7 SUV - Powerful for rough roads', 'e-tron - Electric SUV', 'RS5 - High-performance coupe', 'A4 - Versatile mid-range sedan'] },
      { name: 'Porsche', products: ['911 Turbo - Iconic sports car', 'Cayenne - Premium SUV', 'Taycan - Electric sports car', 'Panamera - Luxury hybrid sedan', 'Macan - Compact luxury SUV'] },
      { name: 'MAN', products: ['TGX Truck - Heavy-duty logistics', 'TGS - Construction truck', 'eTGE Van - Electric delivery van', 'Lion’s City Bus - Efficient city bus', 'NEOPLAN Coach - Luxury long-distance coach'] },
      { name: 'Daimler Trucks', products: ['Actros - Long-haul truck', 'Arocs - Construction truck', 'Econic - Waste management truck', 'Fuso Canter - Light-duty truck', 'Unimog - All-terrain vehicle'] },
      { name: 'Bosch', products: ['Fuel Injectors - Precision efficiency', 'ABS Systems - Enhanced safety', 'Starters - Reliable for fleets', 'Battery Sensors - EV optimization', 'Wiper Systems - Durable in harsh climates'] },
      { name: 'Continental', products: ['ContiPremiumContact - Premium tires', 'EcoContact - Fuel-efficient tires', 'ContiCrossContact - All-terrain tires', 'Air Springs - Truck suspension', 'Brake Systems - High-performance brakes'] },
      { name: 'ZF Friedrichshafen', products: ['8HP Transmission - Luxury car transmission', 'TraXon - Heavy-duty truck transmission', 'Electric Axles - EV components', 'Steering Systems - Precision steering', 'Clutch Systems - Durable clutches'] }
    ]
  },
  {
    name: 'Renewable Energy',
    icon: Sun,
    image: '/api/placeholder/300/400',
    subcategories: [
      { name: 'SMA Solar', products: ['Sunny Boy Inverter - Efficient for homes', 'Sunny Tripower - Commercial inverter', 'Sunny Island - Off-grid battery inverter', 'Solar Monitoring - Real-time tracking', 'EV Charger - Solar-powered charging'] },
      { name: 'Siemens Energy', products: ['Solar Turbines - High-efficiency turbines', 'PV Inverters - Rural electrification', 'Energy Storage - Battery systems', 'Grid Stabilizers - Stable power supply', 'Solar Controllers - Precision control'] },
      { name: 'Q CELLS', products: ['Q.PEAK Panels - High-output panels', 'Q.FLAT - Flat-roof systems', 'Q.HOME Battery - Energy storage', 'Q.MOUNT - Mounting systems', 'Q.PLUS - Durable panels'] },
      { name: 'Solarwatt', products: ['Vision Glass Panels - Aesthetic panels', 'Matrix Battery - Scalable storage', 'EasyIn Panels - Simple installation', 'MyReserve - Efficient battery', 'EnergyManager - Smart control'] },
      { name: 'Wacker Chemie', products: ['Polysilicon - High-purity silicon', 'Silicone Sealants - Durable sealants', 'Solar Adhesives - Bonding solutions', 'Conductive Films - Solar components', 'Thermal Pads - Heat management'] },
      { name: 'Heckert Solar', products: ['NeMo Panels - High-efficiency panels', 'Mono Series - Monocrystalline panels', 'Bifacial Modules - Dual-sided panels', 'Smart Panels - IoT-enabled', 'Roof Tiles - Solar-integrated tiles'] },
      { name: 'IBC Solar', products: ['PolySol Panels - Cost-effective panels', 'MaxPower Inverters - High-capacity inverters', 'Mounting Kits - Easy-install kits', 'Battery Packs - Reliable storage', 'Solar Pumps - Agricultural water pumps'] },
      { name: 'Fronius', products: ['Symo Inverter - Hybrid inverter', 'Primo - Single-phase inverter', 'Eco Inverter - Commercial-grade', 'Solar.web - Monitoring platform', 'Battery Chargers - Solar chargers'] },
      { name: 'BayWa r.e.', products: ['Solar Modules - High-quality panels', 'Floating PV - Innovative systems', 'Energy Systems - Integrated solutions', 'Inverter Sets - Complete sets', 'Solar Kits - All-in-one kits'] },
      { name: 'Aleo Solar', products: ['LEO Panels - Durable panels', 'High-Efficiency Modules - Premium panels', 'Solar Roof Systems - Integrated roofs', 'Battery Backup - Reliable storage', 'Solar Trackers - Efficiency boosters'] }
    ]
  },
  {
    name: 'Medical Technology',
    icon: Stethoscope,
    image: '/api/placeholder/300/400',
    subcategories: [
      { name: 'Siemens Healthineers', products: ['MRI Scanners - High-resolution imaging', 'CT Scanners - Fast diagnostics', 'Ultrasound Machines - Portable units', 'X-Ray Systems - Reliable imaging', 'Lab Analyzers - Precision diagnostics'] },
      { name: 'Fresenius', products: ['Dialysis Machines - Life-saving tech', 'Dialyzers - High-efficiency filters', 'Infusion Pumps - Precise delivery', 'Bloodline Systems - Safe dialysis', 'Water Treatment - Pure water systems'] },
      { name: 'Dräger', products: ['Ventilators - Critical care units', 'Anesthesia Machines - Safe surgery', 'Patient Monitors - Real-time tracking', 'Incubators - Neonatal care', 'Gas Detectors - Safety tools'] },
      { name: 'Carl Zeiss Meditec', products: ['Surgical Microscopes - Precision optics', 'Ophthalmic Lasers - Eye care', 'Diagnostic Systems - Eye health tools', 'Intraocular Lenses - Vision correction', 'OCT Scanners - Advanced imaging'] },
      { name: 'B. Braun', products: ['Infusion Sets - Reliable IV systems', 'Syringe Pumps - Accurate dosing', 'Surgical Sutures - High-quality threads', 'Dialysis Fluids - Essential fluids', 'Wound Care - Advanced dressings'] },
      { name: 'KARL STORZ', products: ['Endoscopes - Minimally invasive tools', 'Laparoscopes - Surgical precision', 'Imaging Systems - HD visuals', 'Surgical Instruments - Durable tools', 'Light Sources - Bright illumination'] },
      { name: 'Paul Hartmann', products: ['Wound Dressings - Sterile solutions', 'Surgical Gloves - High-quality gloves', 'Incontinence Products - Care items', 'Disinfectants - Hygiene solutions', 'Bandages - Trusted dressings'] },
      { name: 'Ottobock', products: ['Prosthetic Limbs - Advanced mobility', 'Wheelchairs - Durable designs', 'Orthopedic Braces - Support aids', 'Exoskeletons - Rehab tech', 'Mobility Aids - Everyday solutions'] },
      { name: 'Gerresheimer', products: ['Syringes - Precision syringes', 'Vials - Safe vaccine storage', 'Ampoules - Drug containers', 'Inhalers - Respiratory care', 'Medical Bottles - Durable packaging'] },
      { name: 'Eppendorf', products: ['Pipettes - Accurate lab tools', 'Centrifuges - High-speed units', 'PCR Machines - Diagnostics', 'Cryo Tubes - Sample storage', 'Incubators - Controlled environments'] }
    ]
  },
  {
    name: 'Baby Food & Products',
    icon: Baby,
    image: '/api/placeholder/300/400',
    subcategories: [
      { name: 'HiPP', products: ['Organic Milk Formula - Nutrient-rich', 'Baby Cereals - Healthy grains', 'Fruit Purees - Natural snacks', 'Vegetable Meals - Balanced diets', 'Biscuits - Safe treats'] },
      { name: 'Milupa', products: ['Infant Formula - High-quality milk', 'Porridges - Nutritious meals', 'Fruit Jars - Pureed fruits', 'Teething Biscuits - Gentle snacks', 'Desserts - Creamy treats'] },
      { name: 'Nestlé (Alete)', products: ['Milk Powder - Trusted formula', 'Baby Puffs - Easy snacks', 'Purees - Organic meals', 'Cereal Bars - Healthy bites', 'Juices - Natural drinks'] },
      { name: 'Holle', products: ['Organic Formula - Pure milk', 'Grain Porridge - Wholesome meals', 'Veggie Purees - Nutrient-packed', 'Baby Teas - Soothing drinks', 'Snack Bars - Organic treats'] },
      { name: 'Bebivita', products: ['Starter Formula - Gentle milk', 'Fruit Compotes - Tasty snacks', 'Dinner Jars - Balanced meals', 'Cereals - Easy-digest grains', 'Milks - Follow-on nutrition'] },
      { name: 'NUK', products: ['Baby Bottles - Safe feeding', 'Pacifiers - Infant comfort', 'Teethers - Durable relief', 'Sippy Cups - Transition cups', 'Breast Pumps - Reliable for moms'] },
      { name: 'BABY LOVE', products: ['Diapers - High-absorbency', 'Wipes - Gentle cleaning', 'Rash Creams - Soothing care', 'Bodysuits - Soft clothing', 'Shampoos - Mild formulas'] },
      { name: 'Weleda', products: ['Baby Oil - Natural care', 'Lotions - Gentle hydration', 'Diaper Cream - Protective balm', 'Bath Milk - Calming wash', 'Toothpaste - Safe oral care'] },
      { name: 'Penaten', products: ['Creams - Healing balms', 'Powders - Soft protection', 'Wash Gels - Gentle cleansers', 'Oils - Moisturizing care', 'Soaps - Mild bars'] },
      { name: 'Pampers', products: ['Diapers - Premium comfort', 'Training Pants - Easy wear', 'Wipes - Soft wipes', 'Swim Pants - Leak-proof', 'Sleep Pants - Nighttime protection'] }
    ]
  },
  {
    name: 'Luxury Goods',
    icon: Diamond,
    image: '/api/placeholder/300/400',
    subcategories: [
      { name: 'Montblanc', products: ['Fountain Pens - Elegant writing', 'Watches - Precision timepieces', 'Leather Wallets - Luxury storage', 'Cufflinks - Stylish accessories', 'Notebooks - Premium journals'] },
      { name: 'Porsche Design', products: ['Sunglasses - High-end eyewear', 'Watches - Sporty elegance', 'Bags - Luxury travel', 'Pens - Sleek design', 'Jackets - Premium outerwear'] },
      { name: 'Hugo Boss', products: ['Suits - Tailored elegance', 'Perfumes - Signature scents', 'Watches - Modern luxury', 'Shoes - Polished footwear', 'Ties - Classy accessories'] },
      { name: 'Rimowa', products: ['Aluminum Suitcases - Durable travel', 'Polycarbonate Cases - Lightweight luxury', 'Backpacks - Stylish carry', 'Travel Accessories - Premium add-ons', 'Cabin Bags - Compact elegance'] },
      { name: 'Leica', products: ['M10 Camera - Precision photography', 'APO Lenses - Superior optics', 'Binoculars - Clear vision', 'Compact Cameras - Portable luxury', 'Rangefinders - Advanced focus'] },
      { name: 'Wempe', products: ['Diamond Rings - Exquisite jewelry', 'Watches - German craftsmanship', 'Necklaces - Elegant designs', 'Earrings - Luxury accents', 'Bracelets - Timeless style'] },
      { name: 'A. Lange & Söhne', products: ['Lange 1 - Iconic watch', 'Saxonia - Minimalist luxury', 'Zeitwerk - Innovative design', 'Datograph - Precision chronograph', 'Tourbillon - Masterpiece watch'] },
      { name: 'Meissen', products: ['Porcelain Vases - Artisanal beauty', 'Dinner Sets - Luxury dining', 'Figurines - Collectible art', 'Teapots - Elegant serveware', 'Cups - Fine porcelain'] },
      { name: 'Rosenthal', products: ['Ceramic Plates - Modern dining', 'Vases - Artistic decor', 'Coffee Sets - Stylish serving', 'Bowls - Premium quality', 'Glassware - Elegant drinkware'] },
      { name: 'Zwilling', products: ['Chef Knives - Precision cutting', 'Cookware Sets - Durable pots', 'Cutlery - Luxury dining', 'Scissors - High-quality tools', 'Knife Blocks - Organized storage'] }
    ]
  },
  {
    name: 'Sports Equipment',
    icon: Shirt,
    image: '/api/placeholder/300/400',
    subcategories: [
      { name: 'Adidas', products: ['Predator Boots - Football precision', 'Ultraboost - Running comfort', 'Training Gear - Durable apparel', 'Backpacks - Sporty carry', 'Balls - High-quality sports'] },
      { name: 'Puma', products: ['Future Cleats - Agile footwear', 'Evostripe - Casual sportswear', 'Running Shoes - Lightweight performance', 'Gym Bags - Functional design', 'Socks - Comfort fit'] },
      { name: 'Uvex', products: ['Ski Goggles - Clear vision', 'Bike Helmets - Safety first', 'Gloves - Protective gear', 'Sunglasses - Sports optics', 'Knee Pads - Injury prevention'] },
      { name: 'Bauerfeind', products: ['Knee Braces - Joint support', 'Ankle Supports - Stability aid', 'Compression Sleeves - Recovery boost', 'Back Braces - Posture help', 'Insoles - Foot comfort'] },
      { name: 'Jako', products: ['Team Jerseys - Customizable kits', 'Shorts - Breathable fabric', 'Tracksuits - Training wear', 'Goalkeeper Gloves - Grip strength', 'Shin Guards - Protective gear'] },
      { name: 'Erima', products: ['Sports Jackets - Weatherproof', 'Training Pants - Flexible fit', 'Balls - Durable design', 'Bags - Team storage', 'Socks - Performance wear'] },
      { name: 'Kettler', products: ['Exercise Bikes - Home fitness', 'Treadmills - Cardio excellence', 'Weight Benches - Strength training', 'Rowing Machines - Full-body workout', 'Ellipticals - Low-impact exercise'] },
      { name: 'Canyon', products: ['Aeroad Bikes - Speed cycling', 'Endurace - Long-distance bikes', 'MTB - Rugged terrain', 'E-Bikes - Electric assist', 'Helmets - Safety gear'] },
      { name: 'Völkl', products: ['Skis - Alpine performance', 'Ski Poles - Sturdy support', 'Bindings - Secure fit', 'Ski Bags - Easy transport', 'Snowboards - Versatile boards'] },
      { name: 'Deuter', products: ['Hiking Backpacks - Durable carry', 'Sleeping Bags - Warm comfort', 'Hydration Packs - Trail-ready', 'Travel Packs - Lightweight design', 'Daypacks - Everyday use'] }
    ]
  },
  {
    name: 'Machinery & Engineering',
    icon: Factory,
    image: '/api/placeholder/300/400',
    subcategories: [
      { name: 'Siemens', products: ['PLC Systems - Automation control', 'Motors - Efficient power', 'Drives - Precision motion', 'HMI Panels - User-friendly interface', 'Sensors - Accurate detection'] },
      { name: 'Bosch Rexroth', products: ['Hydraulic Pumps - Powerful flow', 'Linear Motion - Smooth operation', 'Valves - Reliable control', 'Cylinders - Durable actuation', 'Controllers - Smart automation'] },
      { name: 'Krones', products: ['Filling Machines - Beverage precision', 'Labelers - High-speed labeling', 'Packers - Efficient packaging', 'Inspectors - Quality assurance', 'Conveyors - Seamless transport'] },
      { name: 'GEA', products: ['Centrifuges - Processing efficiency', 'Homogenizers - Consistent mixing', 'Separators - Pure output', 'Dryers - Industrial drying', 'Pumps - Fluid handling'] },
      { name: 'Trumpf', products: ['Laser Cutters - Precision cutting', 'Punch Presses - Metal forming', 'Bending Machines - Accurate shaping', 'Welding Systems - Strong joins', '3D Printers - Advanced manufacturing'] },
      { name: 'Heidenhain', products: ['Encoders - Precision measurement', 'CNC Controls - Machine accuracy', 'Linear Scales - Reliable positioning', 'Touch Probes - Quality checks', 'Displays - Clear readouts'] },
      { name: 'Festo', products: ['Pneumatic Valves - Fast control', 'Cylinders - Robust movement', 'Grippers - Secure handling', 'Sensors - Smart detection', 'Tubing - Durable connections'] },
      { name: 'Liebherr', products: ['Tower Cranes - Heavy lifting', 'Excavators - Earth moving', 'Wheel Loaders - Material handling', 'Concrete Mixers - Construction aid', 'Crawler Cranes - Stable lifting'] },
      { name: 'Jungheinrich', products: ['Forklifts - Warehouse efficiency', 'Reach Trucks - High stacking', 'Pallet Trucks - Easy transport', 'AGVs - Automated handling', 'Racking Systems - Storage solutions'] },
      { name: 'Schuler', products: ['Presses - Metal forming', 'Die Systems - Precision tooling', 'Automation - Production speed', 'Coining Presses - Minting quality', 'Blanking Lines - Sheet processing'] }
    ]
  },
  {
    name: 'Chemicals & Pharmaceuticals',
    icon: Microscope,
    image: '/api/placeholder/300/400',
    subcategories: [
      { name: 'BASF', products: ['Catalysts - Reaction efficiency', 'Coatings - Durable finishes', 'Plastics - Versatile materials', 'Agrochemicals - Crop protection', 'Additives - Performance boost'] },
      { name: 'Bayer', products: ['Aspirin - Pain relief', 'Crop Protection - Yield increase', 'Xarelto - Blood thinner', 'Herbicides - Weed control', 'Diabetes Care - Glucose monitoring'] },
      { name: 'Merck', products: ['Pharma APIs - Active ingredients', 'Liquid Crystals - Display tech', 'Pigments - Color brilliance', 'Biopharma - Biotech drugs', 'Lab Reagents - Research quality'] },
      { name: 'Evonik', products: ['Silica - Industrial strength', 'Polymers - Durable plastics', 'Amino Acids - Nutrition boost', 'Catalysts - Process efficiency', 'Coatings - Protective layers'] },
      { name: 'Lanxess', products: ['Rubber Chemicals - Tire strength', 'Plastics - Engineering grade', 'Flame Retardants - Safety boost', 'Dyes - Vibrant colors', 'Lubricants - Smooth operation'] },
      { name: 'Boehringer Ingelheim', products: ['Spiriva - Respiratory aid', 'Jardiance - Diabetes control', 'Pradaxa - Anticoagulant', 'Vetmedin - Animal health', 'Metacam - Pain relief'] },
      { name: 'Henkel', products: ['Loctite - Strong adhesives', 'Pattex - Bonding solutions', 'Schwarzkopf - Hair care', 'Persil - Laundry detergent', 'Dial - Body wash'] },
      { name: 'Beiersdorf', products: ['Nivea Cream - Skin hydration', 'Eucerin - Dermatology care', 'Labello - Lip protection', 'Hansaplast - Wound healing', '8x4 - Deodorant'] },
      { name: 'Symrise', products: ['Fragrances - Premium scents', 'Flavors - Taste enhancement', 'Actives - Cosmetic boost', 'Aromas - Food quality', ' Extracts - Natural ingredients'] },
      { name: 'Wacker', products: ['Silicones - Versatile sealants', 'Polymers - Binding strength', 'Biosolutions - Biotech aid', 'Silanes - Chemical bonding', 'Pyrogenic Silica - Thickening agent'] }
    ]
  },
  {
    name: 'Electrical Engineering',
    icon: Cpu,
    image: '/api/placeholder/300/400',
    subcategories: [
      { name: 'Siemens', products: ['Circuit Breakers - Safety control', 'Transformers - Power distribution', 'Switchgear - Reliable switching', 'Relays - Automation aid', 'Cables - Durable wiring'] },
      { name: 'Phoenix Contact', products: ['Terminal Blocks - Secure connections', 'Connectors - Easy linking', 'Surge Protection - Device safety', 'Relays - Control precision', 'Markers - Clear labeling'] },
      { name: 'Hager', products: ['Distribution Boards - Power management', 'MCBs - Circuit protection', 'Switches - User-friendly', 'Enclosures - Device housing', 'Smart Controls - Home automation'] },
      { name: 'Rittal', products: ['Enclosures - Industrial protection', 'Climate Control - Cooling solutions', 'Power Distribution - Efficient supply', 'IT Racks - Server housing', 'Control Panels - Organized wiring'] },
      { name: 'Lapp', products: ['Power Cables - High durability', 'Data Cables - Fast transmission', 'Connectors - Reliable links', 'Glands - Secure fittings', 'Conduits - Cable protection'] },
      { name: 'Osram', products: ['LED Bulbs - Energy-efficient lighting', 'Smart Lights - Home automation', 'Floodlights - Outdoor brightness', 'Lamps - Stylish illumination', 'Sensors - Light control'] },
      { name: 'Busch-Jaeger', products: ['Smart Switches - Home control', 'Sockets - Safe outlets', 'Dimmers - Light adjustment', 'Motion Sensors - Energy saving', 'Intercoms - Secure entry'] },
      { name: 'AEG', products: ['Washing Machines - Reliable cleaning', 'Ovens - Precision cooking', 'Fridges - Fresh storage', 'Dishwashers - Efficient washing', 'Hoods - Kitchen ventilation'] },
      { name: 'Miele', products: ['Vacuum Cleaners - Powerful suction', 'Coffee Machines - Barista quality', 'Dryers - Gentle drying', 'Cookers - High performance', 'Freezers - Long-term storage'] },
      { name: 'Legrand', products: ['Wiring Devices - Safe connections', 'Cable Trays - Organized routing', 'UPS Systems - Power backup', 'Switches - Modern design', 'Sockets - Reliable power'] }
    ]
  },
  {
    name: 'Food & Beverages',
    icon: UtensilsCrossed,
    image: '/api/placeholder/300/400',
    subcategories: [
      { name: 'Dr. Oetker', products: ['Pizza - Quick meals', 'Baking Mixes - Easy prep', 'Puddings - Creamy desserts', 'Frozen Desserts - Sweet treats', 'Yeast - Baking aid'] },
      { name: 'Radeberger', products: ['Pilsner - Crisp beer', 'Radler - Refreshing mix', 'Alcohol-Free - Healthy option', 'Weissbier - Smooth taste', 'Export - Classic brew'] },
      { name: 'Dallmayr', products: ['Prodomo Coffee - Rich flavor', 'Espresso - Bold taste', 'Tea - Premium blends', 'Capsules - Easy brewing', 'Ground Coffee - Fresh aroma'] },
      { name: 'Haribo', products: ['Goldbears - Chewy candy', 'Happy Cola - Fun sweets', 'Tropifrutti - Fruity gummies', 'Licorice - Classic taste', 'Maoam - Soft chews'] },
      { name: 'Ritter Sport', products: ['Milk Chocolate - Creamy delight', 'Dark Chocolate - Rich flavor', 'Nut Bars - Crunchy mix', 'Marzipan - Sweet filling', 'Mini Bars - Snack size'] },
      { name: 'Bahlsen', products: ['Leibniz - Butter biscuits', 'Choco Wafers - Creamy layers', 'Pick Up! - Chocolate bars', 'Waffeletten - Light snacks', 'First Class - Premium biscuits'] },
      { name: 'Kühne', products: ['Mustard - Spicy kick', 'Pickles - Crunchy taste', 'Vinegar - Cooking essential', 'Sauces - Flavor boost', 'Relish - Tasty topping'] },
      { name: 'Nordzucker', products: ['White Sugar - Sweet purity', 'Brown Sugar - Rich taste', 'Sugar Cubes - Convenient use', 'Syrup - Versatile sweetener', 'Icing Sugar - Baking finish'] },
      { name: 'WMF', products: ['Coffee Machines - Barista quality', 'Cutlery Sets - Elegant dining', 'Pots - Durable cooking', 'Pans - Even heating', 'Kettles - Quick boiling'] },
      { name: 'Löwensenf', products: ['Extra Mustard - Bold spice', 'Medium - Balanced flavor', 'Honey Mustard - Sweet twist', 'Dijon - Smooth taste', 'Grainy - Textured kick'] }
    ]
  },
  {
    name: 'Construction Materials',
    icon: Building2,
    image: '/api/placeholder/300/400',
    subcategories: [
      { name: 'HeidelbergCement', products: ['Portland Cement - Strong base', 'Concrete Mix - Ready use', 'Aggregates - Durable fill', 'Mortar - Reliable bonding', 'Asphalt - Road quality'] },
      { name: 'Knauf', products: ['Plasterboard - Wall strength', 'Joint Compounds - Smooth finish', 'Ceiling Tiles - Acoustic design', 'Insulation - Energy saving', 'Plaster - Easy application'] },
      { name: 'Sto', products: ['Exterior Coatings - Weatherproof', 'Interior Paints - Vibrant colors', 'Render Systems - Durable finish', 'Insulation Boards - Thermal efficiency', 'Primers - Strong adhesion'] },
      { name: 'Schüco', products: ['Aluminum Windows - Modern design', 'Sliding Doors - Space-saving', 'Facades - Building aesthetics', 'Solar Shades - Energy control', 'Ventilation - Air quality'] },
      { name: 'Hörmann', products: ['Garage Doors - Secure entry', 'Industrial Doors - Heavy duty', 'Entrance Doors - Stylish safety', 'Operators - Automated access', 'Fire Doors - Emergency protection'] },
      { name: 'Wienerberger', products: ['Clay Bricks - Classic strength', 'Roof Tiles - Durable cover', 'Pavers - Outdoor beauty', 'Blocks - Structural support', 'Facings - Decorative finish'] },
      { name: 'Sika', products: ['Sealants - Leak-proof', 'Adhesives - Strong bonding', 'Waterproofing - Moisture barrier', 'Concrete Additives - Enhanced strength', 'Grouts - Stable fill'] },
      { name: 'Wacker', products: ['Construction Silicones - Flexible sealing', 'Polymer Binders - Coating strength', 'Cement Additives - Durability boost', 'Grouts - Precision fill', 'Sealants - Weather resistance'] },
      { name: 'Peri', products: ['Formwork Systems - Concrete shaping', 'Scaffolding - Safe access', 'Shoring - Structural support', 'Plywood - Formwork base', 'Climbing Systems - High-rise aid'] },
      { name: 'Xella', products: ['AAC Blocks - Lightweight strength', 'Calcium Silicate - Fireproofing', 'Insulation Panels - Energy efficiency', 'Lintels - Load support', 'Wall Systems - Quick build'] }
    ]
  },
  {
    name: 'Textiles & Apparel',
    icon: Shirt,
    image: '/api/placeholder/300/400',
    subcategories: [
      { name: 'Hugo Boss', products: ['Suits - Tailored fit', 'Shirts - Crisp style', 'Jackets - Modern warmth', 'Trousers - Elegant cut', 'Coats - Premium outerwear'] },
      { name: 'Adidas', products: ['Track Pants - Sporty comfort', 'Jerseys - Team pride', 'Hoodies - Casual warmth', 'Shorts - Active wear', 'Sneakers - Stylish steps'] },
      { name: 'Puma', products: ['T-Shirts - Breathable fit', 'Leggings - Flexible wear', 'Jackets - Lightweight cover', 'Caps - Sporty shade', 'Slides - Easy footwear'] },
      { name: 'Trigema', products: ['Polo Shirts - Classic comfort', 'Sweatshirts - Cozy fit', 'Tees - Everyday wear', 'Pants - Durable basics', 'Jackets - Simple style'] },
      { name: 'Marc O’Polo', products: ['Sweaters - Soft warmth', 'Blazers - Casual chic', 'Dresses - Elegant flow', 'Scarves - Stylish wrap', 'Jeans - Modern fit'] },
      { name: 'S.Oliver', products: ['Denim - Trendy cut', 'Blouses - Light elegance', 'Coats - Seasonal cover', 'Skirts - Versatile style', 'Shoes - Everyday comfort'] },
      { name: 'Esprit', products: ['Casual Tops - Relaxed fit', 'Jackets - Urban edge', 'Dresses - Fresh design', 'Bags - Practical chic', 'Belts - Subtle accent'] },
      { name: 'Jack Wolfskin', products: ['Rain Jackets - Waterproof', 'Fleece - Warm layers', 'Hiking Pants - Rugged use', 'Boots - Trail-ready', 'Backpacks - Outdoor carry'] },
      { name: 'Strellson', products: ['Suits - Sharp look', 'Overcoats - Sleek cover', 'Shirts - Polished finish', 'Ties - Bold statement', 'Briefcases - Professional carry'] },
      { name: 'Gerry Weber', products: ['Dresses - Feminine flair', 'Cardigans - Soft layers', 'Trousers - Tailored fit', 'Blouses - Elegant touch', 'Jackets - Stylish warmth'] }
    ]
  },
  {
    name: 'Furniture & Household',
    icon: Sofa,
    image: '/api/placeholder/300/400',
    subcategories: [
      { name: 'Hülsta', products: ['Wardrobes - Spacious storage', 'Beds - Modern comfort', 'Dressers - Sleek design', 'Shelves - Organized space', 'Tables - Functional style'] },
      { name: 'Bulthaup', products: ['Kitchens - Premium layout', 'Islands - Cooking hubs', 'Cabinets - Smart storage', 'Sinks - Elegant utility', 'Worktops - Durable surfaces'] },
      { name: 'WMF', products: ['Pots - Even heating', 'Pans - Non-stick quality', 'Cutlery - Fine dining', 'Kettles - Fast boiling', 'Coffee Makers - Rich brews'] },
      { name: 'Zwilling', products: ['Knives - Sharp precision', 'Cookware - Long-lasting', 'Scissors - Clean cuts', 'Blocks - Knife storage', 'Steels - Blade maintenance'] },
      { name: 'Le Creuset', products: ['Cast Iron Pots - Heat retention', 'Casseroles - Slow cooking', 'Skillets - Versatile frying', 'Bakeware - Even baking', 'Kettles - Stylish boiling'] },
      { name: 'Villeroy & Boch', products: ['Dinner Sets - Elegant dining', 'Glassware - Clear quality', 'Cutlery - Sleek design', 'Bowls - Practical use', 'Mugs - Cozy drinks'] },
      { name: 'Nolte', products: ['Kitchen Units - Modern prep', 'Cabinets - Space-saving', 'Drawers - Smooth access', ' Islands - Functional style', 'Shelving - Organized storage'] },
      { name: 'Röhm', products: ['Acrylic Sheets - Clear decor', 'Panels - Versatile use', 'Tubes - Creative design', 'Rods - Structural support', 'Films - Protective layers'] },
      { name: 'Hansgrohe', products: ['Faucets - Water efficiency', 'Showerheads - Refreshing flow', 'Mixers - Precise control', 'Thermostats - Temp stability', 'Sinks - Modern utility'] },
      { name: 'Duravit', products: ['Toilets - Water-saving', 'Basins - Sleek hygiene', 'Bathtubs - Relaxing soak', 'Bidets - Clean comfort', 'Vanities - Stylish storage'] }
    ]
  },
  {
    name: 'Logistics & Transport',
    icon: Plane,
    image: '/api/placeholder/300/400',
    subcategories: [
      { name: 'DHL', products: ['Express Shipping - Fast delivery', 'Freight - Heavy transport', 'Parcel - Small packages', 'E-commerce - Online logistics', 'Warehousing - Storage solutions'] },
      { name: 'DB Schenker', products: ['Land Freight - Road transport', 'Air Freight - Global reach', 'Ocean Freight - Bulk shipping', 'Contract Logistics - Tailored service', 'Tracking - Real-time updates'] },
      { name: 'Lufthansa Cargo', products: ['Air Freight - Speedy delivery', 'Cool Chain - Cold transport', 'Dangerous Goods - Safe handling', 'Charters - Custom flights', 'Live Animals - Secure travel'] },
      { name: 'Kuehne+Nagel', products: ['Sea Freight - Container shipping', 'Air Logistics - Quick transit', 'Road Logistics - Local delivery', 'Warehousing - Space management', 'Customs - Smooth clearance'] },
      { name: 'Hellmann', products: ['Freight Forwarding - Global reach', 'Customs Brokerage - Easy import', 'Project Cargo - Large items', 'E-commerce - Online shipping', 'Warehousing - Efficient storage'] },
      { name: 'Deutsche Bahn', products: ['Rail Freight - Eco-friendly', 'Intermodal - Combined transport', 'Wagons - Cargo carriers', 'Terminals - Logistics hubs', 'Tracking - Shipment visibility'] },
      { name: 'Hapag-Lloyd', products: ['Containers - Secure shipping', 'Reefers - Cold cargo', 'Special Cargo - Unique needs', 'Tankers - Liquid transport', 'Tracking - Real-time monitoring'] },
      { name: 'Rhenus', products: ['Freight Logistics - Multi-modal', 'Port Services - Harbor handling', 'Warehousing - Organized storage', 'Home Delivery - Consumer reach', 'Supply Chain - End-to-end'] },
      { name: 'Dachser', products: ['Air & Sea - Global shipping', 'Road Transport - Regional delivery', 'Warehousing - Space solutions', 'DIY Logistics - Retail support', 'Tracking - Shipment updates'] },
      { name: 'Hermes', products: ['Parcel Delivery - Doorstep service', 'Returns - Easy handling', 'International - Cross-border', 'Tracking - Package monitoring', 'Drop Points - Convenient pickup'] }
    ]
  },
  {
    name: 'IT & Software',
    icon: Cpu,
    image: '/api/placeholder/300/400',
    subcategories: [
      { name: 'SAP', products: ['ERP - Business management', 'HANA - Data processing', 'S/4HANA - Next-gen ERP', 'SuccessFactors - HR solutions', 'Ariba - Procurement tools'] },
      { name: 'Siemens Digital', products: ['PLM - Product lifecycle', 'MindSphere - IoT platform', 'NX - Design software', 'Teamcenter - Collaboration tool', 'Opcenter - Manufacturing aid'] },
      { name: 'DATEV', products: ['Accounting - Financial software', 'Payroll - Employee management', 'Tax - Compliance tool', 'Audit - Review system', 'Cloud - Secure access'] },
      { name: 'TeamViewer', products: ['Remote Desktop - Access anywhere', 'Meetings - Video calls', 'IoT - Device control', 'Support - AR assistance', 'Monitoring - System checks'] },
      { name: 'Software AG', products: ['ARIS - Process modeling', 'webMethods - Integration', 'Cumulocity - IoT platform', 'Adabas - Database speed', 'Alfabet - IT planning'] },
      { name: 'Atoss', products: ['Workforce - Staff scheduling', 'Time Tracking - Hour logs', 'Demand Planning - Resource use', 'Mobile App - On-the-go access', 'Analytics - Performance insights'] },
      { name: 'Nemetschek', products: ['Vectorworks - Design software', 'Allplan - BIM tool', 'Graphisoft - Architectural CAD', 'Bluebeam - PDF collaboration', 'Maxon - 3D modeling'] },
      { name: 'Suse', products: ['Linux Enterprise - Stable OS', 'Rancher - Kubernetes management', 'OpenStack - Cloud platform', 'Storage - Data solutions', 'Support - Technical aid'] },
      { name: 'Raisin', products: ['Savings - Investment platform', 'Pension - Retirement plans', 'ETFs - Market access', 'Banking - Financial hub', 'Insights - Money analytics'] },
      { name: 'Commercetools', products: ['E-commerce - Shopping platform', 'API - Flexible integration', 'Headless Commerce - Custom frontends', 'Marketplace - Vendor hub', 'Analytics - Sales insights'] }
    ]
  },
  {
    name: 'Packaging Solutions',
    icon: Package,
    image: '/api/placeholder/300/400',
    subcategories: [
      { name: 'Krones', products: ['Bottling Lines - Beverage fill', 'Labelers - Product branding', 'Packers - Efficient boxing', 'Inspectors - Quality checks', 'Stretch Wrappers - Secure packing'] },
      { name: 'Bosch Packaging', products: ['Filling Machines - Precise dosing', 'Sealing - Leak-proof', 'Cartoning - Box assembly', 'Blister Packs - Pharma safety', 'Conveyors - Smooth flow'] },
      { name: 'Multivac', products: ['Vacuum Sealers - Freshness lock', 'Tray Sealers - Food safety', 'Thermoformers - Custom shapes', 'Labelers - Clear marking', 'Shrink Wrap - Tight fit'] },
      { name: 'Tetra Pak', products: ['Carton Packs - Liquid storage', 'Filling Systems - High speed', 'Caps - Secure closure', 'Processing - Food prep', 'Distribution - Easy transport'] },
      { name: 'Sidel', products: ['PET Blowers - Bottle shaping', 'Fillers - Liquid precision', 'Labelers - Brand visibility', 'Packers - Efficient stacking', 'Palletizers - Warehouse ready'] },
      { name: 'Optima', products: ['Filling Lines - Pharma accuracy', 'Capping - Secure seals', 'Packaging - Flexible options', 'Freeze Dryers - Long shelf life', 'Inspection - Quality assurance'] },
      { name: 'Schubert', products: ['Pick & Place - Automation', 'Cartoners - Box packing', 'Tray Packers - Organized load', 'Vision Systems - Error check', 'Flow Wrappers - Continuous pack'] },
      { name: 'Beumer', products: ['Conveyors - Material flow', 'Palletizers - Stack efficiency', 'Stretch Hoods - Weatherproof', 'Sortation - Order fulfillment', 'Loaders - Bulk handling'] },
      { name: 'Sealed Air', products: ['Bubble Wrap - Protective cushion', 'Foam - Shock absorption', 'Mailers - Secure shipping', 'Shrink Film - Tight cover', 'Food Pads - Freshness aid'] },
      { name: 'KHS', products: ['Filling Systems - Beverage speed', 'Cappers - Tight seals', 'Labelers - High clarity', 'Packers - Efficient cases', 'Palletizers - Stable stacks'] }
    ]
  },
  {
    name: 'Agriculture & Equipment',
    icon: Tractor,
    image: '/api/placeholder/300/400',
    subcategories: [
      { name: 'Claas', products: ['Combine Harvesters - Crop efficiency', 'Tractors - Field power', 'Balers - Hay packing', 'Foragers - Silage prep', 'Loaders - Material lift'] },
      { name: 'Fendt', products: ['Tractors - Precision farming', 'Harvesters - Grain collection', 'Planters - Seed accuracy', 'Sprayers - Crop care', 'Loaders - Farm utility'] },
      { name: 'Amazone', products: ['Spreaders - Fertilizer distribution', 'Sprayers - Pest control', 'Seed Drills - Planting precision', 'Cultivators - Soil prep', 'Mowers - Grass cut'] },
      { name: 'Lemken', products: ['Plows - Soil turning', 'Cultivators - Weed control', 'Seeders - Crop planting', 'Harrows - Field leveling', 'Rollers - Soil compaction'] },
      { name: 'Horsch', products: ['Seed Drills - High accuracy', 'Cultivators - Soil care', 'Sprayers - Crop protection', 'Rollers - Ground finish', 'Planters - Efficient sowing'] },
      { name: 'Stihl', products: ['Chainsaws - Tree cutting', 'Trimmers - Lawn care', 'Blowers - Debris clear', 'Brushcutters - Tough weeds', 'Hedge Trimmers - Neat edges'] },
      { name: 'Kverneland', products: ['Plows - Deep tillage', 'Mowers - Field maintenance', 'Spreaders - Nutrient supply', 'Balers - Hay storage', 'Seeders - Crop start'] },
      { name: 'Deutz-Fahr', products: ['Tractors - Farm strength', 'Combines - Harvest speed', 'Loaders - Material handling', 'Balers - Crop packing', 'Engines - Reliable power'] },
      { name: 'Krone', products: ['Mowers - Clean cuts', 'Tedders - Hay drying', 'Rakes - Crop gathering', 'Balers - Tight bales', 'Forage Wagons - Feed transport'] },
      { name: 'Grimme', products: ['Potato Harvesters - Root efficiency', 'Planters - Seed placement', 'Cultivators - Soil work', 'Graders - Crop sorting', 'Storage - Produce care'] }
    ]
  },
  {
    name: 'Cosmetics & Skincare',
    icon: Droplet,
    image: '/api/placeholder/300/400',
    subcategories: [
      { name: 'Nivea', products: ['Cream - Daily hydration', 'Body Lotion - Soft skin', 'Lip Balm - Moisture lock', 'Deodorant - Freshness', 'Face Wash - Gentle cleanse'] },
      { name: 'Babor', products: ['Serums - Skin renewal', 'Masks - Deep care', 'Creams - Luxury moisture', 'Cleansers - Pure refresh', 'Ampoules - Intense boost'] },
      { name: 'Weleda', products: ['Skin Food - Natural nourish', 'Baby Cream - Gentle care', 'Oils - Body glow', 'Toothpaste - Fresh breath', 'Shampoo - Hair health'] },
      { name: 'Dr. Hauschka', products: ['Facial Toner - Skin balance', 'Cleansing Cream - Soft purify', 'Rose Cream - Rich moisture', 'Eye Cream - Bright lift', 'Lip Care - Smooth finish'] },
      { name: 'Kneipp', products: ['Bath Oils - Relaxing soak', 'Shower Gel - Fresh clean', 'Lotions - Silky touch', 'Herbal Teas - Calm wellness', 'Salts - Muscle relief'] },
      { name: 'Sebamed', products: ['Cleansing Bar - pH balance', 'Moisturizer - Sensitive care', 'Shampoo - Gentle wash', 'Baby Lotion - Soft protection', 'Deodorant - Mild freshness'] },
      { name: 'Lavera', products: ['Face Cream - Organic hydration', 'Body Wash - Eco clean', 'Lipstick - Natural color', 'Sunscreen - Safe shield', 'Hair Care - Shine boost'] },
      { name: 'Annemarie Börlind', products: ['Day Cream - Anti-aging', 'Night Cream - Deep repair', 'Eye Serum - Wrinkle lift', 'Cleanser - Pure refresh', 'Masks - Skin revive'] },
      { name: 'Schwan-Stabilo', products: ['Lip Pencils - Precise lines', 'Eyeliners - Bold look', 'Mascara - Lash volume', 'Foundation - Even tone', 'Blush - Healthy glow'] },
      { name: 'Beiersdorf', products: ['Nivea Men - Male grooming', 'After Shave - Cool relief', 'Sun Lotion - UV protection', 'Hand Cream - Soft hands', 'Body Milk - Deep care'] }
    ]
  },
  {
    name: 'Security & Safety',
    icon: Lock,
    image: '/api/placeholder/300/400',
    subcategories: [
      { name: 'Dräger', products: ['Gas Detectors - Hazard alert', 'Breathalyzers - Safety check', 'Masks - Respiratory shield', 'Fire Systems - Emergency response', 'Sensors - Risk detection'] },
      { name: 'Bosch Security', products: ['CCTV Cameras - Clear surveillance', 'Alarms - Intrusion alert', 'Access Control - Secure entry', 'Intercoms - Communication', 'Detectors - Motion sense'] },
      { name: 'Siemens', products: ['Fire Alarms - Early warning', 'Smoke Detectors - Quick sense', 'Sprinklers - Fire suppression', 'Security Systems - Integrated safety', 'Locks - Access control'] },
      { name: 'Dormakaba', products: ['Door Locks - Secure entry', 'Key Systems - Access management', 'Safes - Asset protection', 'Readers - Card access', 'Exit Devices - Emergency escape'] },
      { name: 'Hella', products: ['Warning Lights - Visibility boost', 'Sirens - Alert sound', 'Beacons - Signal safety', 'Work Lamps - Night work', 'Horns - Audible warning'] },
      { name: 'Abus', products: ['Padlocks - Strong security', 'Bike Locks - Theft prevention', 'Alarm Systems - Home safety', 'Window Locks - Break-in shield', 'Chains - Heavy-duty lock'] },
      { name: 'Uvex', products: ['Safety Glasses - Eye protection', 'Helmets - Head safety', 'Gloves - Hand guard', 'Ear Plugs - Noise block', 'Respirators - Air purity'] },
      { name: 'SICK', products: ['Sensors - Hazard detection', 'Scanners - Area monitoring', 'Safety Switches - Machine stop', 'Light Curtains - Zone safety', 'Controllers - System integration'] },
      { name: 'Hörmann', products: ['Security Doors - Break-in proof', 'Gates - Perimeter control', 'Rollers - Access limit', 'Operators - Automated safety', 'Locks - Strong hold'] },
      { name: 'GfS', products: ['Safety Handles - Secure grip', 'Door Guards - Entry control', 'Escape Systems - Quick exit', 'Locking Bars - Reinforced safety', 'Alarms - Intrusion alert'] }
    ]
  },
  {
    name: 'Consumer Electronics',
    icon: Wrench,
    image: '/api/placeholder/300/400',
    subcategories: [
      { name: 'Siemens', products: ['Dishwashers - Efficient clean', 'Ovens - Precise cooking', 'Fridges - Fresh storage', 'Hobs - Fast heating', 'Hoods - Air purity'] },
      { name: 'Bosch', products: ['Drills - Powerful boring', 'Saws - Clean cuts', 'Grinders - Smooth finish', 'Vacuums - Deep clean', 'Washers - Reliable laundry'] },
      { name: 'Miele', products: ['Washing Machines - Gentle care', 'Dryers - Quick dry', 'Coffee Makers - Rich brew', 'Irons - Crisp press', 'Ovens - Even bake'] },
      { name: 'Grundig', products: ['TVs - Sharp display', 'Radios - Clear sound', 'Blenders - Smooth mix', 'Hair Dryers - Fast styling', 'Toasters - Even toast'] },
      { name: 'Loewe', products: ['OLED TVs - Vivid colors', 'Speakers - Rich audio', 'Soundbars - Immersive sound', 'Media Players - Easy streaming', 'Remotes - Smart control'] },
      { name: 'Sennheiser', products: ['Headphones - Clear sound', 'Microphones - Crisp recording', 'Earphones - Portable audio', 'Amplifiers - Sound boost', 'Wireless Systems - Free listening'] },
      { name: 'AEG', products: ['Cookers - Versatile prep', 'Freezers - Long storage', 'Microwaves - Quick heat', 'Hoods - Kitchen air', 'Irons - Smooth press'] },
      { name: 'Blaupunkt', products: ['Car Radios - Road tunes', 'Speakers - Home audio', 'LED TVs - Budget display', 'Dashcams - Drive record', 'Alarm Clocks - Wake-up aid'] },
      { name: 'Liebherr', products: ['Fridges - Cool efficiency', 'Freezers - Deep freeze', 'Wine Coolers - Perfect temp',- 'Chest Freezers - Bulk storage', 'Ice Makers - Fresh ice'] },
      { name: 'Metz', products: ['LED TVs - Bright visuals', 'Monitors - Clear screens', 'Projectors - Big display', 'Smart TVs - Connected viewing', 'Remotes - Easy control'] }
    ]
  }
];

export default function MegaMenu() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const displayedCategories = showMore ? categories : categories.slice(0, 10);
  return (
    <div 
      className="relative h-auto md:h-[400px] w-full"
      onMouseLeave={() => setActiveCategory(null)}
    >
      <div className="bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-md w-full md:w-84 h-full rounded-xl lg:rounded-r-xl shadow-2xl border border-white/10">
        <ul className="py-2 max-h-[400px] overflow-y-auto scrollbar-hide">
          {displayedCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <li
                key={index}
                className="group relative px-2"
                onMouseEnter={() => setActiveCategory(category)}
              >
                <button className="w-full px-3 py-2 text-left text-white/90 hover:text-white flex items-center justify-between rounded-lg transition-all duration-300 hover:bg-white/10">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Icon className="h-4 w-4" />
                      <Sparkles className="absolute -top-1 -right-1 h-2 w-2 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <span className="font-medium text-xs">{category.name}</span>
                  </div>
                  <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-white transition-colors duration-300 group-hover:translate-x-1 transform" />
                </button>
              </li>
            );
          })}
          {!showMore && (
            <li className="px-2">
              <button
                onClick={() => setShowMore(true)}
                className="w-full px-3 py-2 text-left text-white/90 hover:text-white flex items-center justify-between rounded-lg transition-all duration-300 hover:bg-white/10"
              >
                <span className="font-medium text-xs">More Categories</span>
                <ChevronRight className="h-3 w-3 text-gray-400 hover:text-white transition-colors duration-300" />
              </button>
            </li>
          )}
        </ul>
      </div>
      {activeCategory && (
        <div 
          className="absolute left-0 md:left-[275px] top-0 min-h-full w-full md:w-[1000px] z-50 opacity-100 transition-all duration-300 md:translate-x-2"
          onMouseEnter={() => setActiveCategory(activeCategory)}
        >
          <div className="bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 p-6 ml-4 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4">
                {activeCategory.subcategories.map((sub, subIndex) => (
                  <div key={subIndex} className="space-y-2">
                    <h3 className="text-white font-medium text-xs bg-white/10 px-2 py-1 rounded-md inline-block">
                      {sub.name}
                    </h3>
                    <ul className="space-y-1">
                      {sub.products.map((product, prodIndex) => (
                        <li key={prodIndex}>
                          <a href="#" className="text-white/70 hover:text-white text-xs transition-colors duration-200">
                            {product}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-[200px] flex-shrink-0">
              <div className="rounded-lg overflow-hidden">
                <img
                  src={activeCategory.image}
                  alt={activeCategory.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}