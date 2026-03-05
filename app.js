// 应用逻辑
let filteredQuotes = [...quotes];
let currentCategory = 'all';

// 初始化应用
function init() {
    renderQuotes();
    renderFilters();
    updateStats();
}

// 渲染语录卡片
function renderQuotes(quotesToRender = quotes) {
    const grid = document.getElementById('quotesGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (quotesToRender.length === 0) {
        grid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    grid.innerHTML = quotesToRender.map(quote => `
        <div class="quote-card">
            <div class="quote-text">"${quote.text}"</div>
            <div class="quote-author">— ${quote.author}</div>
            <div class="quote-meta">
                <span class="quote-category">${quote.category}</span>
                <span class="quote-date">${formatDate(quote.date)}</span>
            </div>
        </div>
    `).join('');
}

// 渲染分类过滤按钮
function renderFilters() {
    const categories = ['all', ...new Set(quotes.map(q => q.category))];
    const filterSection = document.getElementById('filterSection');
    
    filterSection.innerHTML = categories.map(cat => `
        <button class="filter-btn ${cat === 'all' ? 'active' : ''}" onclick="filterByCategory('${cat}')">
            ${cat === 'all' ? '全部' : cat}
        </button>
    `).join('');
}

// 按分类过滤
function filterByCategory(category) {
    currentCategory = category;
    
    // 更新按钮样式
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // 过滤和显示
    if (category === 'all') {
        filteredQuotes = [...quotes];
    } else {
        filteredQuotes = quotes.filter(q => q.category === category);
    }
    
    renderQuotes(filteredQuotes);
    updateStats();
}

// 搜索功能
function search() {
    const keyword = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (!keyword) {
        filteredQuotes = currentCategory === 'all' 
            ? [...quotes] 
            : quotes.filter(q => q.category === currentCategory);
    } else {
        const tempQuotes = currentCategory === 'all' 
            ? [...quotes] 
            : quotes.filter(q => q.category === currentCategory);
        
        filteredQuotes = tempQuotes.filter(quote => 
            quote.text.toLowerCase().includes(keyword) ||
            quote.author.toLowerCase().includes(keyword)
        );
    }
    
    renderQuotes(filteredQuotes);
}

// 回车搜索
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                search();
            }
        });
    }
});

// 更新统计信息
function updateStats() {
    const uniqueAuthors = new Set(quotes.map(q => q.author));
    const uniqueCategories = new Set(quotes.map(q => q.category));
    
    document.getElementById('totalQuotes').textContent = quotes.length;
    document.getElementById('totalPeople').textContent = uniqueAuthors.size;
    document.getElementById('totalCategories').textContent = uniqueCategories.size;
}

// 格式化日期
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 页面加载时初始化
init();
