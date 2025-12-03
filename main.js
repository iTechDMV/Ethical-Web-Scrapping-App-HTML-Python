// Property Records Scraper - Main Application Logic

class PropertyScraper {
    constructor() {
        this.isScraping = false;
        this.currentPage = 1;
        this.itemsPerPage = 20;
        this.allProperties = [];
        this.filteredProperties = [];
        this.scrapingInterval = null;
        this.scrapingProgress = 0;
        
        this.initializeApp();
    }

    initializeApp() {
        this.initializeAnimations();
        this.bindEventListeners();
        this.loadSampleData();
        this.updateDisplay();
    }

    initializeAnimations() {
        // Initialize text splitting for animations
        if (typeof Splitting !== 'undefined') {
            Splitting();
            
            // Animate gradient text
            anime({
                targets: '.gradient-text .char',
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(50),
                duration: 800,
                easing: 'easeOutExpo'
            });
        }

        // Animate cards on load
        anime({
            targets: '.glass-card',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(200),
            duration: 1000,
            easing: 'easeOutExpo'
        });
    }

    bindEventListeners() {
        // Search and filter controls
        document.getElementById('applyFilters').addEventListener('click', () => this.applyFilters());
        document.getElementById('clearFilters').addEventListener('click', () => this.clearFilters());
        
        // Scraping controls
        document.getElementById('startScraping').addEventListener('click', () => this.startScraping());
        document.getElementById('stopScraping').addEventListener('click', () => this.stopScraping());
        document.getElementById('scrapeSample').addEventListener('click', () => this.scrapeSampleData());
        document.getElementById('clearResults').addEventListener('click', () => this.clearResults());
        
        // Export controls
        document.getElementById('exportCSV').addEventListener('click', () => this.exportData('csv'));
        document.getElementById('exportExcel').addEventListener('click', () => this.exportData('excel'));
        
        // Pagination
        document.getElementById('prevPage').addEventListener('click', () => this.changePage(-1));
        document.getElementById('nextPage').addEventListener('click', () => this.changePage(1));
        
        // Modal controls
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        
        // Real-time search
        document.getElementById('addressSearch').addEventListener('input', () => this.debounce(this.applyFilters.bind(this), 300)());
        document.getElementById('ownerSearch').addEventListener('input', () => this.debounce(this.applyFilters.bind(this), 300)());
        document.getElementById('parcelSearch').addEventListener('input', () => this.debounce(this.applyFilters.bind(this), 300)());
    }

    loadSampleData() {
        // Sample property data for demonstration
        this.allProperties = [
            {
                id: 1,
                address: "123 Main St, Harrisonburg, VA 22801",
                owner: "John Smith",
                assessment: 285000,
                lastSale: "2024-03-15",
                type: "Residential",
                parcelId: "123-45-6789",
                squareFeet: 2100,
                bedrooms: 3,
                bathrooms: 2.5,
                yearBuilt: 1995,
                lotSize: 0.25,
                taxAmount: 3420
            },
            {
                id: 2,
                address: "456 Oak Ave, Harrisonburg, VA 22801",
                owner: "Sarah Johnson",
                assessment: 320000,
                lastSale: "2024-01-22",
                type: "Residential",
                parcelId: "234-56-7890",
                squareFeet: 2400,
                bedrooms: 4,
                bathrooms: 3,
                yearBuilt: 2008,
                lotSize: 0.31,
                taxAmount: 3840
            },
            {
                id: 3,
                address: "789 Pine St, Harrisonburg, VA 22801",
                owner: "Robert Davis",
                assessment: 195000,
                lastSale: "2023-11-08",
                type: "Residential",
                parcelId: "345-67-8901",
                squareFeet: 1650,
                bedrooms: 3,
                bathrooms: 2,
                yearBuilt: 1987,
                lotSize: 0.18,
                taxAmount: 2340
            },
            {
                id: 4,
                address: "321 Elm St, Harrisonburg, VA 22801",
                owner: "Maria Garcia",
                assessment: 275000,
                lastSale: "2024-02-14",
                type: "Residential",
                parcelId: "456-78-9012",
                squareFeet: 1900,
                bedrooms: 3,
                bathrooms: 2.5,
                yearBuilt: 2001,
                lotSize: 0.22,
                taxAmount: 3300
            },
            {
                id: 5,
                address: "654 Cedar Ave, Harrisonburg, VA 22801",
                owner: "Michael Wilson",
                assessment: 410000,
                lastSale: "2024-04-03",
                type: "Commercial",
                parcelId: "567-89-0123",
                squareFeet: 3500,
                bedrooms: null,
                bathrooms: null,
                yearBuilt: 2015,
                lotSize: 0.75,
                taxAmount: 6150
            },
            {
                id: 6,
                address: "987 Maple Dr, Harrisonburg, VA 22801",
                owner: "Jennifer Brown",
                assessment: 305000,
                lastSale: "2023-12-19",
                type: "Residential",
                parcelId: "678-90-1234",
                squareFeet: 2200,
                bedrooms: 4,
                bathrooms: 2.5,
                yearBuilt: 2012,
                lotSize: 0.28,
                taxAmount: 3660
            },
            {
                id: 7,
                address: "147 Birch St, Harrisonburg, VA 22801",
                owner: "David Miller",
                assessment: 225000,
                lastSale: "2024-01-05",
                type: "Residential",
                parcelId: "789-01-2345",
                squareFeet: 1750,
                bedrooms: 3,
                bathrooms: 2,
                yearBuilt: 1998,
                lotSize: 0.20,
                taxAmount: 2700
            },
            {
                id: 8,
                address: "258 Walnut Ave, Harrisonburg, VA 22801",
                owner: "Lisa Anderson",
                assessment: 365000,
                lastSale: "2024-03-28",
                type: "Residential",
                parcelId: "890-12-3456",
                squareFeet: 2600,
                bedrooms: 4,
                bathrooms: 3,
                yearBuilt: 2018,
                lotSize: 0.35,
                taxAmount: 4380
            },
            {
                id: 9,
                address: "369 Spruce St, Harrisonburg, VA 22801",
                owner: "James Taylor",
                assessment: 240000,
                lastSale: "2023-10-12",
                type: "Residential",
                parcelId: "901-23-4567",
                squareFeet: 1800,
                bedrooms: 3,
                bathrooms: 2,
                yearBuilt: 2005,
                lotSize: 0.23,
                taxAmount: 2880
            },
            {
                id: 10,
                address: "741 Ash Dr, Harrisonburg, VA 22801",
                owner: "Emma Thompson",
                assessment: 295000,
                lastSale: "2024-02-08",
                type: "Residential",
                parcelId: "012-34-5678",
                squareFeet: 2000,
                bedrooms: 3,
                bathrooms: 2.5,
                yearBuilt: 2009,
                lotSize: 0.26,
                taxAmount: 3540
            }
        ];
        
        this.filteredProperties = [...this.allProperties];
    }

    applyFilters() {
        const address = document.getElementById('addressSearch').value.toLowerCase();
        const owner = document.getElementById('ownerSearch').value.toLowerCase();
        const parcel = document.getElementById('parcelSearch').value.toLowerCase();
        const assessMin = parseFloat(document.getElementById('assessMin').value) || 0;
        const assessMax = parseFloat(document.getElementById('assessMax').value) || Infinity;
        const propertyType = document.getElementById('propertyType').value;

        this.filteredProperties = this.allProperties.filter(property => {
            const matchesAddress = !address || property.address.toLowerCase().includes(address);
            const matchesOwner = !owner || property.owner.toLowerCase().includes(owner);
            const matchesParcel = !parcel || property.parcelId.toLowerCase().includes(parcel);
            const matchesAssessment = property.assessment >= assessMin && property.assessment <= assessMax;
            const matchesType = !propertyType || property.type.toLowerCase() === propertyType.toLowerCase();

            return matchesAddress && matchesOwner && matchesParcel && matchesAssessment && matchesType;
        });

        this.currentPage = 1;
        this.updateDisplay();
        this.animateTableUpdate();
    }

    clearFilters() {
        document.getElementById('addressSearch').value = '';
        document.getElementById('ownerSearch').value = '';
        document.getElementById('parcelSearch').value = '';
        document.getElementById('assessMin').value = '';
        document.getElementById('assessMax').value = '';
        document.getElementById('propertyType').value = '';

        this.filteredProperties = [...this.allProperties];
        this.currentPage = 1;
        this.updateDisplay();
        this.animateTableUpdate();
    }

    startScraping() {
        if (this.isScraping) return;

        this.isScraping = true;
        this.scrapingProgress = 0;
        
        // Update UI
        document.getElementById('startScraping').disabled = true;
        document.getElementById('stopScraping').disabled = false;
        document.getElementById('scrapingStatus').textContent = 'Running';
        document.getElementById('scrapingStatus').className = 'px-2 py-1 bg-green-100 text-green-700 rounded text-sm scraping-status';

        // Simulate scraping process
        this.scrapingInterval = setInterval(() => {
            this.scrapingProgress += Math.random() * 15;
            
            if (this.scrapingProgress >= 100) {
                this.scrapingProgress = 100;
                this.completeScraping();
            }
            
            this.updateScrapingProgress();
        }, 500);

        // Add random properties during scraping
        this.addScrapingProperties();
    }

    stopScraping() {
        if (!this.isScraping) return;

        this.isScraping = false;
        clearInterval(this.scrapingInterval);
        
        // Update UI
        document.getElementById('startScraping').disabled = false;
        document.getElementById('stopScraping').disabled = true;
        document.getElementById('scrapingStatus').textContent = 'Stopped';
        document.getElementById('scrapingStatus').className = 'px-2 py-1 bg-red-100 text-red-700 rounded text-sm';
    }

    completeScraping() {
        this.isScraping = false;
        clearInterval(this.scrapingInterval);
        
        // Update UI
        document.getElementById('startScraping').disabled = false;
        document.getElementById('stopScraping').disabled = true;
        document.getElementById('scrapingStatus').textContent = 'Complete';
        document.getElementById('scrapingStatus').className = 'px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm';
        document.getElementById('lastUpdated').textContent = new Date().toLocaleTimeString();
        
        // Show completion animation
        anime({
            targets: '#progressBar',
            backgroundColor: '#059669',
            duration: 500,
            easing: 'easeOutQuad'
        });
    }

    updateScrapingProgress() {
        document.getElementById('progressBar').style.width = `${this.scrapingProgress}%`;
        document.getElementById('scrapingProgress').textContent = `${Math.round(this.scrapingProgress)}%`;
        document.getElementById('recordsFound').textContent = this.allProperties.length;
    }

    addScrapingProperties() {
        // Simulate finding new properties during scraping
        const scrapingInterval = setInterval(() => {
            if (!this.isScraping) {
                clearInterval(scrapingInterval);
                return;
            }

            const newProperty = this.generateRandomProperty();
            this.allProperties.push(newProperty);
            this.filteredProperties.push(newProperty);
            this.updateDisplay();
        }, 2000);
    }

    generateRandomProperty() {
        const streets = ['Main St', 'Oak Ave', 'Pine St', 'Elm St', 'Cedar Ave', 'Maple Dr', 'Birch St', 'Walnut Ave', 'Spruce St', 'Ash Dr'];
        const owners = ['Johnson Family', 'Williams Trust', 'Davis Properties', 'Miller Holdings', 'Anderson Estate'];
        const types = ['Residential', 'Commercial', 'Agricultural'];
        
        return {
            id: Date.now() + Math.random(),
            address: `${Math.floor(Math.random() * 900) + 100} ${streets[Math.floor(Math.random() * streets.length)]}, Harrisonburg, VA 22801`,
            owner: owners[Math.floor(Math.random() * owners.length)],
            assessment: Math.floor(Math.random() * 500000) + 150000,
            lastSale: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            type: types[Math.floor(Math.random() * types.length)],
            parcelId: `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 9000) + 1000}`,
            squareFeet: Math.floor(Math.random() * 2000) + 1200,
            bedrooms: Math.floor(Math.random() * 4) + 2,
            bathrooms: Math.floor(Math.random() * 3) + 1.5,
            yearBuilt: Math.floor(Math.random() * 40) + 1980,
            lotSize: Math.random() * 0.5 + 0.1,
            taxAmount: Math.floor(Math.random() * 5000) + 2000
        };
    }

    scrapeSampleData() {
        // Add sample data with animation
        const sampleProperties = [
            {
                id: Date.now(),
                address: "1598 Country Club Rd, Harrisonburg, VA 22801",
                owner: "Sample Property LLC",
                assessment: 425000,
                lastSale: "2024-05-15",
                type: "Residential",
                parcelId: "159-89-4567",
                squareFeet: 2800,
                bedrooms: 4,
                bathrooms: 3,
                yearBuilt: 2010,
                lotSize: 0.42,
                taxAmount: 5100
            }
        ];

        this.allProperties.push(...sampleProperties);
        this.applyFilters();
        
        // Show success message
        this.showNotification('Sample data added successfully!', 'success');
    }

    clearResults() {
        this.allProperties = [];
        this.filteredProperties = [];
        this.currentPage = 1;
        this.updateDisplay();
        
        // Show success message
        this.showNotification('All results cleared!', 'info');
    }

    updateDisplay() {
        this.updateTable();
        this.updatePagination();
        this.updateCounters();
    }

    updateTable() {
        const tbody = document.getElementById('resultsTable');
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageProperties = this.filteredProperties.slice(startIndex, endIndex);

        tbody.innerHTML = pageProperties.map(property => `
            <tr class="data-row border-b border-gray-100 cursor-pointer" onclick="scraper.showPropertyDetails(${property.id})">
                <td class="py-3 px-4 text-sm text-gray-900">${property.address}</td>
                <td class="py-3 px-4 text-sm text-gray-700">${property.owner}</td>
                <td class="py-3 px-4 text-sm text-gray-700">$${property.assessment.toLocaleString()}</td>
                <td class="py-3 px-4 text-sm text-gray-700">${new Date(property.lastSale).toLocaleDateString()}</td>
                <td class="py-3 px-4 text-sm text-gray-700">
                    <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        ${property.type}
                    </span>
                </td>
            </tr>
        `).join('');
    }

    updatePagination() {
        const totalPages = Math.ceil(this.filteredProperties.length / this.itemsPerPage);
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredProperties.length);

        document.getElementById('prevPage').disabled = this.currentPage <= 1;
        document.getElementById('nextPage').disabled = this.currentPage >= totalPages;
        document.getElementById('pageInfo').textContent = `Page ${this.currentPage} of ${totalPages}`;
        document.getElementById('showingCount').textContent = `${startIndex + 1}-${endIndex}`;
        document.getElementById('totalCount').textContent = this.filteredProperties.length;
    }

    updateCounters() {
        document.getElementById('recordsFound').textContent = this.allProperties.length;
    }

    changePage(direction) {
        const totalPages = Math.ceil(this.filteredProperties.length / this.itemsPerPage);
        const newPage = this.currentPage + direction;
        
        if (newPage >= 1 && newPage <= totalPages) {
            this.currentPage = newPage;
            this.updateDisplay();
            this.animateTableUpdate();
        }
    }

    animateTableUpdate() {
        anime({
            targets: '.data-row',
            opacity: [0, 1],
            translateX: [-20, 0],
            delay: anime.stagger(50),
            duration: 400,
            easing: 'easeOutQuad'
        });
    }

    showPropertyDetails(propertyId) {
        const property = this.allProperties.find(p => p.id === propertyId);
        if (!property) return;

        const modalContent = `
            <div class="space-y-4">
                <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Property Information</h4>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div><span class="text-gray-600">Address:</span><br>${property.address}</div>
                        <div><span class="text-gray-600">Owner:</span><br>${property.owner}</div>
                        <div><span class="text-gray-600">Parcel ID:</span><br>${property.parcelId}</div>
                        <div><span class="text-gray-600">Property Type:</span><br>${property.type}</div>
                        <div><span class="text-gray-600">Assessment:</span><br>$${property.assessment.toLocaleString()}</div>
                        <div><span class="text-gray-600">Tax Amount:</span><br>$${property.taxAmount.toLocaleString()}</div>
                        <div><span class="text-gray-600">Last Sale:</span><br>${new Date(property.lastSale).toLocaleDateString()}</div>
                        <div><span class="text-gray-600">Year Built:</span><br>${property.yearBuilt}</div>
                    </div>
                </div>
                
                ${property.type === 'Residential' ? `
                <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Property Details</h4>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div><span class="text-gray-600">Square Feet:</span><br>${property.squareFeet?.toLocaleString()}</div>
                        <div><span class="text-gray-600">Bedrooms:</span><br>${property.bedrooms}</div>
                        <div><span class="text-gray-600">Bathrooms:</span><br>${property.bathrooms}</div>
                        <div><span class="text-gray-600">Lot Size:</span><br>${property.lotSize} acres</div>
                    </div>
                </div>
                ` : ''}
                
                <div class="flex space-x-2 pt-4">
                    <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        View on Map
                    </button>
                    <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                        Export Details
                    </button>
                </div>
            </div>
        `;

        document.getElementById('modalContent').innerHTML = modalContent;
        document.getElementById('propertyModal').classList.remove('hidden');
        
        // Animate modal appearance
        anime({
            targets: '#propertyModal .bg-white',
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }

    closeModal() {
        document.getElementById('propertyModal').classList.add('hidden');
    }

    exportData(format) {
        if (this.filteredProperties.length === 0) {
            this.showNotification('No data to export', 'warning');
            return;
        }

        const data = this.filteredProperties.map(property => ({
            'Address': property.address,
            'Owner': property.owner,
            'Assessment': property.assessment,
            'Last Sale Date': property.lastSale,
            'Property Type': property.type,
            'Parcel ID': property.parcelId,
            'Square Feet': property.squareFeet || '',
            'Bedrooms': property.bedrooms || '',
            'Bathrooms': property.bathrooms || '',
            'Year Built': property.yearBuilt || '',
            'Lot Size (Acres)': property.lotSize || '',
            'Tax Amount': property.taxAmount
        }));

        if (format === 'csv') {
            this.downloadCSV(data);
        } else if (format === 'excel') {
            this.downloadExcel(data);
        }

        this.showNotification(`Data exported as ${format.toUpperCase()}`, 'success');
    }

    downloadCSV(data) {
        const csv = this.convertToCSV(data);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `property_records_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    downloadExcel(data) {
        // For demo purposes, we'll use CSV format but with Excel extension
        // In a real application, you'd use a library like SheetJS
        const csv = this.convertToCSV(data);
        const blob = new Blob([csv], { type: 'application/vnd.ms-excel' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `property_records_${new Date().toISOString().split('T')[0]}.xls`;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    convertToCSV(data) {
        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
        ].join('\n');
        
        return csvContent;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium ${
            type === 'success' ? 'bg-green-600' :
            type === 'warning' ? 'bg-yellow-600' :
            type === 'error' ? 'bg-red-600' : 'bg-blue-600'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
        
        // Remove after 3 seconds
        setTimeout(() => {
            anime({
                targets: notification,
                translateX: [0, 300],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInQuad',
                complete: () => notification.remove()
            });
        }, 3000);
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the application
let scraper;
document.addEventListener('DOMContentLoaded', () => {
    scraper = new PropertyScraper();
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.id === 'propertyModal') {
        scraper.closeModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        scraper.closeModal();
    }
});