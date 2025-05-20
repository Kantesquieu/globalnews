// index_interactive.js - Interactive features for Global Economic Pulse

console.log("Global Economic Pulse interactive features loading...");

// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', function() {
    console.log("Page loaded! Initializing interactive features...");
    
    // 1. LIVE CLOCK IN BREAKING NEWS
    function updateBreakingNewsTime() {
        const breakingNews = document.querySelector('.breaking-news');
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });
        
        // Add live time to breaking news
        if (!document.getElementById('live-time')) {
            const timeElement = document.createElement('span');
            timeElement.id = 'live-time';
            timeElement.style.cssText = `
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 0.9rem;
                opacity: 0.9;
            `;
            breakingNews.style.position = 'relative';
            breakingNews.appendChild(timeElement);
        }
        
        document.getElementById('live-time').innerHTML = `🕐 LIVE: ${timeString}`;
    }
    
    // 2. ANIMATED MARKET PRICES (Simulate real-time updates)
    const marketData = {
        'S&P 500': { base: 4248.12, change: 1.2 },
        'NASDAQ': { base: 13052.45, change: 0.8 },
        'DOW JONES': { base: 33845.97, change: -0.3 },
        'FTSE 100': { base: 7456.23, change: 0.6 },
        'NIKKEI 225': { base: 29123.78, change: 1.5 }
    };
    
    function simulateMarketUpdates() {
        const marketItems = document.querySelectorAll('.market-item');
        
        marketItems.forEach(item => {
            const nameElement = item.querySelector('.market-name');
            const priceElement = item.querySelector('.market-price');
            const marketName = nameElement.textContent;
            
            if (marketData[marketName]) {
                // Simulate small price fluctuations
                const fluctuation = (Math.random() - 0.5) * 0.1; // ±0.05%
                const currentChange = marketData[marketName].change + fluctuation;
                const newPrice = marketData[marketName].base * (1 + currentChange / 100);
                
                // Update the display
                const isPositive = currentChange >= 0;
                priceElement.className = `market-price ${isPositive ? 'positive' : 'negative'}`;
                priceElement.innerHTML = `${newPrice.toFixed(2)} (${isPositive ? '+' : ''}${currentChange.toFixed(2)}%)`;
                
                // Add flash animation
                priceElement.style.transition = 'background-color 0.3s ease';
                priceElement.style.backgroundColor = isPositive ? '#d4edda' : '#f8d7da';
                setTimeout(() => {
                    priceElement.style.backgroundColor = 'transparent';
                }, 300);
                
                // Update stored data
                marketData[marketName].change = currentChange;
            }
        });
    }
    
    // 3. INTERACTIVE NAVIGATION HIGHLIGHTING
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active-nav'));
            
            // Add active class to clicked link
            this.classList.add('active-nav');
            
            // Add some CSS for active state
            if (!document.getElementById('nav-styles')) {
                const style = document.createElement('style');
                style.id = 'nav-styles';
                style.textContent = `
                    .active-nav {
                        background: rgba(255,255,255,0.2) !important;
                        padding: 8px 16px !important;
                        border-radius: 20px !important;
                        transform: scale(1.05) !important;
                    }
                `;
                document.head.appendChild(style);
            }
            
            console.log(`Navigation: ${this.textContent} selected`);
        });
    });
    
    // 4. NEWS CARD CLICK INTERACTIONS
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1)';
            }, 150);
            
            // Simulate article reading
            const title = this.querySelector('h3').textContent;
            
            // Create a modal-like effect
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                cursor: pointer;
            `;
            
            modal.innerHTML = `
                <div style="
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    max-width: 600px;
                    margin: 20px;
                    text-align: center;
                ">
                    <h2 style="color: #2c3e50; margin-bottom: 20px;">📰 Article Preview</h2>
                    <h3 style="color: #34495e; margin-bottom: 15px;">${title}</h3>
                    <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                        This is a preview of the full article. In a real news website, 
                        this would load the complete article content with detailed analysis, 
                        charts, and related stories.
                    </p>
                    <button style="
                        background: #3498db;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 16px;
                    ">Close Preview</button>
                </div>
            `;
            
            modal.addEventListener('click', () => document.body.removeChild(modal));
            document.body.appendChild(modal);
            
            console.log(`Article clicked: ${title}`);
        });
        
        // Add hover sound effect simulation
        card.addEventListener('mouseenter', function() {
            console.log('🔊 Hover sound effect (simulated)');
        });
    });
    
    // 5. TRENDING TOPICS INTERACTION
    const trendingItems = document.querySelectorAll('.trending-list li');
    trendingItems.forEach(item => {
        item.addEventListener('click', function() {
            // Animate the clicked item
            this.style.transform = 'translateX(10px)';
            this.style.background = '#e8f4fd';
            
            setTimeout(() => {
                this.style.transform = 'translateX(0)';
                this.style.background = '';
            }, 200);
            
            // Show trend details
            const trendText = this.textContent;
            const popup = document.createElement('div');
            popup.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #34495e;
                color: white;
                padding: 15px;
                border-radius: 8px;
                z-index: 999;
                max-width: 300px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            `;
            popup.innerHTML = `
                <strong>📊 Trending Topic</strong><br>
                ${trendText}<br>
                <small style="opacity: 0.8;">Click to explore more news about this topic</small>
            `;
            
            document.body.appendChild(popup);
            setTimeout(() => document.body.removeChild(popup), 3000);
            
            console.log(`Trending topic clicked: ${trendText}`);
        });
    });
    
    // 6. SEARCH FUNCTIONALITY
    function addSearchFeature() {
        const headerContent = document.querySelector('.header-content');
        const searchContainer = document.createElement('div');
        searchContainer.style.cssText = `
            position: relative;
            margin-top: 10px;
        `;
        
        searchContainer.innerHTML = `
            <input type="text" id="news-search" placeholder="Search news..." style="
                padding: 8px 15px;
                border: none;
                border-radius: 20px;
                background: rgba(255,255,255,0.2);
                color: white;
                width: 200px;
                outline: none;
            ">
            <button id="search-btn" style="
                background: #3498db;
                border: none;
                color: white;
                padding: 8px 15px;
                border-radius: 20px;
                margin-left: 10px;
                cursor: pointer;
            ">🔍</button>
        `;
        
        headerContent.appendChild(searchContainer);
        
        // Search functionality
        document.getElementById('search-btn').addEventListener('click', performSearch);
        document.getElementById('news-search').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') performSearch();
        });
        
        function performSearch() {
            const query = document.getElementById('news-search').value.toLowerCase();
            const cards = document.querySelectorAll('.news-card');
            
            if (query === '') {
                cards.forEach(card => card.style.display = 'block');
                return;
            }
            
            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const content = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(query) || content.includes(query)) {
                    card.style.display = 'block';
                    card.style.border = '2px solid #3498db';
                } else {
                    card.style.display = 'none';
                }
            });
            
            console.log(`Search performed: "${query}"`);
        }
    }
    
    // 7. THEME TOGGLE
    function addThemeToggle() {
        const themeButton = document.createElement('button');
        themeButton.innerHTML = '🌙';
        themeButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #34495e;
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 20px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 999;
            transition: all 0.3s ease;
        `;
        
        let isDarkMode = false;
        
        themeButton.addEventListener('click', function() {
            isDarkMode = !isDarkMode;
            
            if (isDarkMode) {
                document.body.style.background = '#2c3e50';
                document.body.style.color = '#ecf0f1';
                this.innerHTML = '☀️';
                
                // Update cards for dark mode
                const cards = document.querySelectorAll('.news-card, .widget');
                cards.forEach(card => {
                    card.style.background = '#34495e';
                    card.style.color = '#ecf0f1';
                });
            } else {
                document.body.style.background = '#f8f9fa';
                document.body.style.color = '#333';
                this.innerHTML = '🌙';
                
                // Reset cards
                const cards = document.querySelectorAll('.news-card, .widget');
                cards.forEach(card => {
                    card.style.background = 'white';
                    card.style.color = '#333';
                });
            }
            
            console.log(`Theme switched to: ${isDarkMode ? 'Dark' : 'Light'} mode`);
        });
        
        document.body.appendChild(themeButton);
    }
    
    // 8. VISITOR COUNTER
    function addVisitorCounter() {
        let visits = localStorage.getItem('globalNewsVisits') || 0;
        visits++;
        localStorage.setItem('globalNewsVisits', visits);
        
        const counter = document.createElement('div');
        counter.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(52, 73, 94, 0.9);
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 12px;
            z-index: 999;
        `;
        counter.innerHTML = `👥 Visits: ${visits}`;
        
        document.body.appendChild(counter);
        console.log(`Page visits: ${visits}`);
    }
    
    // Initialize all features
    updateBreakingNewsTime();
    setInterval(updateBreakingNewsTime, 1000); // Update every second
    
    simulateMarketUpdates();
    setInterval(simulateMarketUpdates, 5000); // Update every 5 seconds
    
    addSearchFeature();
    addThemeToggle();
    addVisitorCounter();
    
    console.log("✅ All interactive features initialized successfully!");
    
    // Welcome message
    setTimeout(() => {
        console.log("🎉 Welcome to Global Economic Pulse! Try clicking on news cards, searching, or toggling dark mode!");
    }, 1000);
});
