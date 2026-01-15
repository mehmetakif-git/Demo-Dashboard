# ALLYNC Enterprise Management Platform
## Sistem Mimarisi ve Teknik Dokümantasyon

> **Versiyon:** 1.0
> **Son Güncelleme:** Ocak 2026
> **Platform:** SaaS Demo Dashboard
>
> ### 🌐 Canlı Demo
> **https://demodashboard.allyncai.com/**
>
> | Bilgi | Değer |
> |-------|-------|
> | Demo URL | https://demodashboard.allyncai.com/ |
> | Demo Email | `demo@allync.com` |
> | Demo Şifre | `demo123` |
> | Hosting | Netlify |
> | SSL | ✓ Aktif |

---

## İçindekiler

1. [Genel Bakış](#1-genel-bakış)
2. [Kullanıcı Akışı](#2-kullanıcı-akışı)
3. [Teknik Mimari](#3-teknik-mimari)
4. [Sektör Ekosistemi](#4-sektör-ekosistemi)
5. [Modül Sistemi](#5-modül-sistemi)
6. [State Yönetimi](#6-state-yönetimi)
7. [UI/UX Tasarım Sistemi](#7-uiux-tasarım-sistemi)
8. [Bileşen Kütüphanesi](#8-bileşen-kütüphanesi)
9. [Güvenlik ve Performans](#9-güvenlik-ve-performans)
10. [Proje Yapısı](#10-proje-yapısı)

---

## 1. Genel Bakış

### 1.1 Platform Tanımı

ALLYNC Enterprise Management Platform, farklı sektörlere özelleştirilmiş modüller sunan çok kiracılı (multi-tenant) bir SaaS yönetim panelidir. Bu demo, potansiyel müşterilere sistemin kapsamlı özelliklerini görsel olarak sunmak için tasarlanmıştır.

### 1.2 Temel Özellikler

```
┌─────────────────────────────────────────────────────────────────┐
│                    ALLYNC SaaS Platform                        │
├─────────────────────────────────────────────────────────────────┤
│  ✓ 8 Aktif Sektör + 15 Yakında Eklenecek Sektör                │
│  ✓ 12 Ortak Modül (Tüm sektörlerde kullanılabilir)             │
│  ✓ 160+ Sayfa Bileşeni                                         │
│  ✓ 35+ Yeniden Kullanılabilir UI Bileşeni                      │
│  ✓ Rol Tabanlı Erişim Kontrolü (Admin/Staff)                   │
│  ✓ Modüler ve Ölçeklenebilir Mimari                            │
│  ✓ Responsive ve Modern Tasarım                                │
│  ✓ Gerçek Zamanlı State Yönetimi                               │
└─────────────────────────────────────────────────────────────────┘
```

### 1.3 Teknoloji Stack'i

| Katman | Teknoloji | Versiyon |
|--------|-----------|----------|
| Frontend Framework | React | 19.2.0 |
| Programlama Dili | TypeScript | 5.x |
| State Yönetimi | Zustand | 5.0.9 |
| Routing | React Router DOM | 6.30.2 |
| Stil Sistemi | Tailwind CSS | 4.1.18 |
| Animasyonlar | Framer Motion | 12.23.26 |
| İkonlar | Lucide React | 0.562.0 |
| Build Tool | Vite | Latest |
| Grafikler | Recharts | 3.6.0 |
| 3D Efektler | Three.js | 0.182.0 |

---

## 2. Kullanıcı Akışı

### 2.1 Onboarding Süreci

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│              │    │              │    │              │    │              │
│    LOGIN     │───▶│   SEKTÖR     │───▶│   HESAP      │───▶│   MODÜL      │
│              │    │   SEÇİMİ     │    │   TİPİ       │    │   SEÇİMİ     │
│              │    │              │    │              │    │              │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
      │                    │                   │                   │
      ▼                    ▼                   ▼                   ▼
  Email/Şifre         8 Aktif             Admin veya         İstenen
  Doğrulama          Sektörden            Staff              Modülleri
                     Birini Seç           Seçimi             Aktifleştir
                                                                  │
                                                                  ▼
                                                          ┌──────────────┐
                                                          │              │
                                                          │  DASHBOARD   │
                                                          │              │
                                                          └──────────────┘
```

### 2.2 Detaylı Akış Açıklaması

#### Adım 1: Giriş (Login)
- **URL:** `/login`
- **Bileşen:** `src/pages/auth/Login.tsx`
- **İşlev:** Demo kimlik bilgileriyle giriş yapılır
- **Demo Credentials:** `demo@allync.com` / `demo123`
- **Özellikler:**
  - Beni Hatırla seçeneği
  - Spotlight tur rehberi
  - Animasyonlu form geçişleri

#### Adım 2: Sektör Seçimi
- **URL:** `/select-sector`
- **Bileşen:** `src/pages/onboarding/SectorSelect.tsx`
- **İşlev:** Kullanıcı işletme sektörünü seçer
- **Özellikler:**
  - Grid görünümde sektör kartları
  - Aktif/Yakında rozetleri
  - Hover efektleri ve animasyonlar
  - Sektöre özel ikon ve renkler

#### Adım 3: Hesap Tipi Seçimi
- **URL:** `/select-account`
- **Bileşen:** `src/pages/onboarding/AccountTypeSelect.tsx`
- **Seçenekler:**
  - **Administrator:** Tam sistem erişimi, ayar yönetimi, kullanıcı kontrolü
  - **Staff Member:** Kısıtlı erişim, atanmış modüller

#### Adım 4: Modül Seçimi
- **URL:** `/module-selection`
- **Bileşen:** `src/pages/auth/ModuleSelection.tsx`
- **İşlev:** Kullanılacak modüller seçilir
- **Özellikler:**
  - Toggle ile modül açma/kapama
  - Seçim yapılmazsa tüm modüller aktif
  - Sektöre özel modül önerileri

#### Adım 5: Ana Dashboard
- **URL:** `/dashboard`
- **İşlev:** Seçilen sektör ve modüllere göre özelleştirilmiş panel

---

## 3. Teknik Mimari

### 3.1 Uygulama Katmanları

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           PRESENTATION LAYER                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Pages     │  │  Components │  │   Layout    │  │   Widgets   │    │
│  │  (160+)     │  │   (35+)     │  │  (4 files)  │  │   (Lead)    │    │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘    │
├─────────────────────────────────────────────────────────────────────────┤
│                            STATE LAYER                                  │
│  ┌──────────────────────────────┐  ┌──────────────────────────────┐    │
│  │         authStore            │  │          appStore            │    │
│  │  - isAuthenticated           │  │  - selectedSector            │    │
│  │  - user                      │  │  - selectedAccountType       │    │
│  │  - rememberMe                │  │  - selectedModules           │    │
│  │  - login/logout              │  │  - sidebarCollapsed          │    │
│  └──────────────────────────────┘  └──────────────────────────────┘    │
├─────────────────────────────────────────────────────────────────────────┤
│                            DATA LAYER                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  Mock Data  │  │   Types     │  │  Constants  │  │   Utils     │    │
│  │ (Sektörler) │  │ (TypeScript)│  │  (Routes)   │  │ (Helpers)   │    │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘    │
├─────────────────────────────────────────────────────────────────────────┤
│                          INFRASTRUCTURE                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │    Vite     │  │  Tailwind   │  │   Framer    │  │   React     │    │
│  │   (Build)   │  │   (CSS)     │  │  (Motion)   │  │  (Router)   │    │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Route Guard Sistemi

```typescript
// Kimlik doğrulama kontrolü
RequireAuth → Giriş yapmış mı?
    ├── Hayır → /login'e yönlendir
    └── Evet → Alt bileşeni render et

// Sektör kontrolü
RequireSector → Sektör seçilmiş mi?
    ├── Hayır → /select-sector'e yönlendir
    └── Evet → Alt bileşeni render et

// Hesap tipi kontrolü
RequireAccountType → Hesap tipi seçilmiş mi?
    ├── Hayır → /select-account'a yönlendir
    └── Evet → Dashboard'u göster

// Public route (login sayfası)
PublicRoute → Giriş yapmış mı?
    ├── Evet → Dashboard'a yönlendir
    └── Hayır → Login sayfasını göster
```

### 3.3 Lazy Loading Stratejisi

```typescript
// Sayfa bileşenleri lazy load edilir
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));
const EmployeeList = lazy(() => import('@/pages/dashboard/hr/EmployeeList'));

// Suspense ile loading fallback
<Suspense fallback={<PageLoader />}>
  <Dashboard />
</Suspense>
```

---

## 4. Sektör Ekosistemi

### 4.1 Aktif Sektörler (8 Adet)

| # | Sektör | ID | İkon | Renk | Modül Sayısı |
|---|--------|-----|------|------|--------------|
| 1 | Gym & Fitness | `gym-fitness` | Dumbbell | #ef4444 | 10 |
| 2 | Manpower & Staffing | `manpower-staffing` | Users | #3b82f6 | 12 |
| 3 | Real Estate | `real-estate` | Building | #8b5cf6 | 10 |
| 4 | Advertising Agency | `advertising-agency` | Megaphone | #f97316 | 11 |
| 5 | Event Company | `event-company` | Calendar | #ec4899 | 11 |
| 6 | Beauty Salon | `beauty-salon` | Scissors | #ec4899 | 12 |
| 7 | Laundry & Dry Cleaning | `laundry` | Shirt | #0ea5e9 | 11 |
| 8 | Hardware & Inventory | `hardware` | Wrench | #f59e0b | 13 |

### 4.2 Yakında Eklenecek Sektörler (15 Adet)

- E-Commerce
- Restaurant & Food Service
- Healthcare & Clinic
- Education & Training
- Hotel & Hospitality
- Construction
- Logistics & Transportation
- Manufacturing
- Legal Services
- Retail Store
- Finance & Banking
- Print Shop
- Automotive
- Agriculture
- Tourism

### 4.3 Sektör Bazlı Modüller

#### 🏋️ Gym & Fitness
```
├── Members (Üye Listesi ve Detayları)
├── Memberships (Üyelik Planları)
├── Classes (Ders Programı)
├── Trainers (Eğitmenler)
├── Equipment (Ekipman Yönetimi)
├── Attendance (Giriş-Çıkış Takibi)
├── PT Sessions (Kişisel Antrenman)
└── Assessments (Değerlendirmeler)
```

#### 👔 Manpower & Staffing
```
├── Candidates (Aday Havuzu)
├── Job Orders (İş Talepleri)
├── Placements (Yerleştirmeler)
├── Clients (Müşteri Firmaları)
├── Timesheets (Puantaj)
├── Payroll (Bordro)
├── Compliance (Uyumluluk)
├── Interviews (Mülakatlar)
└── Onboarding (İşe Alım Süreci)
```

#### 🏠 Real Estate
```
├── Properties (Mülk Listesi)
├── Leads (Potansiyel Müşteriler)
├── Showings (Gösterimler)
├── Transactions (İşlemler)
├── Owners (Mülk Sahipleri)
├── Agents (Emlak Danışmanları)
├── Commissions (Komisyonlar)
└── Listings Portal (İlan Portalı)
```

#### 📢 Advertising Agency
```
├── Campaigns (Kampanya Yönetimi)
├── Clients (Müşteri Portföyü)
├── Projects (Proje Takibi)
├── Media Planning (Medya Planlaması)
├── Creatives (Yaratıcı İçerikler)
├── Talent (Yetenek Havuzu)
├── Analytics (Performans Analizi)
└── Invoicing (Faturalama)
```

#### 🎉 Event Company
```
├── Events (Etkinlik Listesi)
├── Calendar (Takvim Görünümü)
├── Venues (Mekan Yönetimi)
├── Vendors (Tedarikçiler)
├── Ticketing (Bilet Satışı)
├── Registrations (Kayıtlar)
├── Guests (Misafir Listesi)
├── Catering (İkram Hizmetleri)
├── Equipment (Ekipman)
└── Budget (Bütçe Takibi)
```

#### 💇 Beauty Salon
```
├── Appointments (Randevu Sistemi)
├── Clients (Müşteri Kartları)
├── Services (Hizmet Listesi)
├── Staff (Personel Yönetimi)
├── Products (Ürün Envanteri)
├── Packages (Paket Hizmetler)
├── Memberships (Üyelik Sistemi)
├── Gift Cards (Hediye Kartları)
└── Reviews (Değerlendirmeler)
```

#### 👕 Laundry & Dry Cleaning
```
├── Orders (Sipariş Yönetimi)
├── New Order (Hızlı Sipariş)
├── Customers (Müşteri Listesi)
├── Services (Hizmet Türleri)
├── Delivery (Teslimat Takibi)
├── Garment Tracking (Parça Takibi)
├── Inventory (Envanter)
├── Complaints (Şikayet Yönetimi)
└── Reports (Raporlar)
```

#### 🔧 Hardware & Inventory
```
├── Products (Ürün Kataloğu)
├── Categories (Kategoriler)
├── Inventory (Stok Yönetimi)
├── Stock Movements (Stok Hareketleri)
├── Suppliers (Tedarikçiler)
├── Purchase Orders (Satın Alma)
├── Sales (POS - Satış)
├── Sales History (Satış Geçmişi)
├── Price Lists (Fiyat Listeleri)
├── Alerts (Düşük Stok Uyarıları)
└── Barcode (Barkod Yönetimi)
```

---

## 5. Modül Sistemi

### 5.1 Ortak Modüller (Tüm Sektörlerde)

Her sektörde kullanılabilen 12 temel modül:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         ORTAK MODÜLLER (12)                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │     HR      │  │ ACCOUNTING  │  │    CRM      │  │   TASKS     │   │
│  │  (8 sayfa)  │  │  (8 sayfa)  │  │  (8 sayfa)  │  │  (6 sayfa)  │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │   ACCESS    │  │  SIGNAGE    │  │   COMMS     │  │   FILES     │   │
│  │  CONTROL    │  │  (5 sayfa)  │  │  (4 sayfa)  │  │  (5 sayfa)  │   │
│  │  (8 sayfa)  │  │             │  │             │  │             │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │  REPORTS    │  │ MAINTENANCE │  │  QR CODES   │  │  SETTINGS   │   │
│  │  (5 sayfa)  │  │  (8 sayfa)  │  │  (8 sayfa)  │  │  (9 sayfa)  │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Modül Detayları

#### 👥 HR - İnsan Kaynakları
| Sayfa | Açıklama |
|-------|----------|
| EmployeeList | Tüm çalışanların listesi, arama ve filtreleme |
| EmployeeDetail | Çalışan detay sayfası (özlük, belgeler, izin, performans) |
| Departments | Departman yönetimi |
| Attendance | Giriş-çıkış takibi |
| LeaveManagement | İzin talepleri ve onayları |
| Payroll | Bordro ve maaş yönetimi |
| Recruitment | İşe alım süreçleri |
| Performance | Performans değerlendirmeleri |

#### 💰 Accounting - Muhasebe
| Sayfa | Açıklama |
|-------|----------|
| Overview | Finansal dashboard, özet metrikler |
| Income | Gelir kayıtları |
| Expenses | Gider kayıtları |
| Invoices | Fatura oluşturma ve takibi |
| BankAccounts | Banka hesapları yönetimi |
| CashFlow | Nakit akış analizi |
| Tax | Vergi hesaplamaları |
| Reports | Finansal raporlar |

#### 🤝 CRM - Müşteri İlişkileri
| Sayfa | Açıklama |
|-------|----------|
| CustomerList | Müşteri listesi |
| CustomerDetail | Müşteri kartı detayları |
| Leads | Potansiyel müşteri takibi |
| Opportunities | Satış fırsatları |
| Quotes | Teklif yönetimi |
| Contracts | Sözleşme takibi |
| Activities | Aktivite logları |
| Reports | CRM raporları |

#### ✅ Tasks - Görev Yönetimi
| Sayfa | Açıklama |
|-------|----------|
| MyTasks | Kişisel görev listesi |
| AllTasks | Tüm görevler |
| Kanban | Kanban board görünümü |
| Calendar | Takvim görünümü |
| Projects | Proje listesi |
| ProjectDetail | Proje detayları |

#### 🔐 Access Control - Erişim Kontrolü
| Sayfa | Açıklama |
|-------|----------|
| CCTVMonitoring | Canlı kamera izleme |
| Cameras | Kamera yönetimi |
| Recordings | Kayıt arşivi |
| DoorAccess | Kapı erişim kontrolü |
| AccessCards | Kart yönetimi |
| AccessLogs | Erişim logları |
| Parking | Otopark yönetimi |
| Visitors | Ziyaretçi takibi |

#### 📺 Signage - Dijital Tabela
| Sayfa | Açıklama |
|-------|----------|
| Displays | Ekran cihazları yönetimi |
| ContentLibrary | İçerik kütüphanesi |
| Playlists | Oynatma listeleri |
| Schedule | Zamanlama |
| Broadcast | Acil duyuru yayını |

#### 💬 Communication - İletişim
| Sayfa | Açıklama |
|-------|----------|
| Chat | Birebir mesajlaşma |
| GroupChats | Grup sohbetleri |
| Announcements | Duyurular |
| Directory | Çalışan rehberi |

#### 📁 Files - Dosya Yönetimi
| Sayfa | Açıklama |
|-------|----------|
| MyFiles | Kişisel dosyalar |
| SharedFiles | Paylaşılan dosyalar |
| ProjectFiles | Proje dosyaları |
| RecentFiles | Son kullanılanlar |
| Trash | Çöp kutusu |

#### 📊 Reports - Raporlama
| Sayfa | Açıklama |
|-------|----------|
| ReportBuilder | Rapor oluşturucu |
| SavedReports | Kayıtlı raporlar |
| ExportCenter | Dışa aktarım merkezi |
| ImportCenter | İçe aktarım merkezi |
| History | Rapor geçmişi |

#### 🔧 Maintenance - Bakım
| Sayfa | Açıklama |
|-------|----------|
| AssetList | Varlık listesi |
| AssetDetail | Varlık detayları |
| WorkOrders | İş emirleri |
| Preventive | Önleyici bakım |
| Requests | Bakım talepleri |
| Vendors | Tedarikçiler |
| Inventory | Yedek parça stoku |
| Reports | Bakım raporları |

#### 📱 QR Codes - QR Kod
| Sayfa | Açıklama |
|-------|----------|
| QRCodeList | QR kod listesi |
| CreateQRCode | QR kod oluştur |
| QRCodeDetail | QR kod detayları |
| Templates | Şablonlar |
| Analytics | Tarama analitiği |
| BulkCreate | Toplu oluşturma |
| DynamicQR | Dinamik QR kodlar |
| Folders | Klasör organizasyonu |

#### ⚙️ Settings - Ayarlar
| Sayfa | Açıklama |
|-------|----------|
| CompanyProfile | Şirket bilgileri |
| Users | Kullanıcı yönetimi |
| Roles | Rol tanımları |
| ModuleSettings | Modül ayarları |
| APIKeys | API anahtarları |
| Integrations | Entegrasyonlar |
| SystemLogs | Sistem logları |
| Backup | Yedekleme |
| Notifications | Bildirim ayarları |

---

## 6. State Yönetimi

### 6.1 Zustand Store Yapısı

```typescript
// authStore.ts - Kimlik Doğrulama State'i
interface AuthState {
  isAuthenticated: boolean;    // Giriş durumu
  user: User | null;           // Kullanıcı bilgileri
  rememberMe: boolean;         // Beni hatırla
  login: (email, password, rememberMe?) => boolean;
  logout: () => void;
  setUser: (user) => void;
}

// appStore.ts - Uygulama State'i
interface AppState {
  selectedSector: string | null;      // Seçili sektör ID'si
  selectedAccountType: AccountType;   // admin | staff
  selectedModules: string[];          // Aktif modül ID'leri
  sidebarCollapsed: boolean;          // Sidebar durumu
  performanceMode: PerformanceMode;   // auto | performance | quality

  // Actions
  setSector: (sector) => void;
  setAccountType: (type) => void;
  setSelectedModules: (modules) => void;
  toggleModule: (moduleId) => void;
  isModuleEnabled: (moduleId) => boolean;
  toggleSidebar: () => void;
  reset: () => void;
}
```

### 6.2 State Kalıcılığı (Persistence)

```typescript
// LocalStorage Keys
STORAGE_KEYS = {
  auth: 'enterprise-panel-auth',   // Kimlik bilgileri
  app: 'enterprise-panel-app',     // Uygulama ayarları
}

// Otomatik persist edilen değerler:
// - isAuthenticated, user, rememberMe
// - selectedSector, selectedAccountType, selectedModules
// - sidebarCollapsed, performanceMode
```

### 6.3 Modül Filtreleme Mantığı

```typescript
isModuleEnabled(moduleId: string): boolean {
  // Hiç modül seçilmemişse → TÜM MODÜLLER AKTİF
  if (selectedModules.length === 0) return true;

  // Aksi halde → Sadece seçili modüller aktif
  return selectedModules.includes(moduleId);
}
```

---

## 7. UI/UX Tasarım Sistemi

### 7.1 Renk Paleti

```css
/* Ana Arka Plan Renkleri */
--background-primary:   #213448;  /* Koyu mavi-gri */
--background-secondary: #2a4259;  /* Orta mavi-gri */
--background-tertiary:  #3a5a72;  /* Açık mavi-gri */

/* Kenarlık Renkleri */
--border-default: #3d5a6e;
--border-hover:   #547792;

/* Vurgu Renkleri */
--accent-primary:   #94B4C1;  /* Açık mavi-yeşil */
--accent-secondary: #EAE0CF;  /* Krem */

/* Durum Renkleri */
--success: #10b981;  /* Yeşil */
--warning: #f59e0b;  /* Turuncu */
--error:   #ef4444;  /* Kırmızı */

/* Metin Renkleri */
--text-primary:   #EAE0CF;  /* Ana metin - Krem */
--text-secondary: #94B4C1;  /* İkincil metin */
--text-muted:     #547792;  /* Soluk metin */
```

### 7.2 Tipografi

```css
/* Font Ailesi */
font-family: 'Inter', system-ui, sans-serif;

/* Font Boyutları (Tailwind) */
text-xs:   0.75rem   /* 12px */
text-sm:   0.875rem  /* 14px */
text-base: 1rem      /* 16px */
text-lg:   1.125rem  /* 18px */
text-xl:   1.25rem   /* 20px */
text-2xl:  1.5rem    /* 24px */
text-3xl:  1.875rem  /* 30px */
```

### 7.3 Animasyonlar

```css
/* Framer Motion + Tailwind Animasyonlar */
animate-fade-in      /* Fade giriş */
animate-fade-out     /* Fade çıkış */
animate-slide-up     /* Yukarı kayma */
animate-slide-down   /* Aşağı kayma */
animate-scale-in     /* Ölçek giriş */
animate-scale-out    /* Ölçek çıkış */
animate-shimmer      /* Parıltı efekti */
animate-float        /* Yüzme efekti */
animate-gradient     /* Gradient animasyonu */
animate-pulse-slow   /* Yavaş nabız */
animate-spin-slow    /* Yavaş dönüş */
```

### 7.4 Layout Boyutları

```typescript
LAYOUT = {
  sidebarWidth: 280,           // Normal sidebar genişliği
  sidebarCollapsedWidth: 80,   // Daraltılmış sidebar
  headerHeight: 64,            // Header yüksekliği
  contentPadding: 24,          // İçerik padding'i
}
```

---

## 8. Bileşen Kütüphanesi

### 8.1 Common Components (24 Adet)

```
src/components/common/
├── Avatar.tsx          # Kullanıcı avatarı
├── Badge.tsx           # Etiket/rozet
├── Button.tsx          # Buton bileşeni
├── Card.tsx            # Kart container
├── ConfirmModal.tsx    # Onay dialogu
├── DataTable.tsx       # Veri tablosu
├── Dropdown.tsx        # Açılır menü
├── EmptyState.tsx      # Boş durum gösterimi
├── ErrorBoundary.tsx   # Hata yakalayıcı
├── ErrorState.tsx      # Hata gösterimi
├── FilterBar.tsx       # Filtre çubuğu
├── FormField.tsx       # Form alanı wrapper
├── GlareHover.tsx      # Parıltı hover efekti
├── GlowInput.tsx       # Parlayan input
├── Input.tsx           # Metin girişi
├── Modal.tsx           # Modal dialog
├── PageHeader.tsx      # Sayfa başlığı
├── PageLoader.tsx      # Sayfa yükleyici
├── Skeleton.tsx        # İskelet yükleyici
├── StatsCard.tsx       # İstatistik kartı
├── StatusBadge.tsx     # Durum rozeti
├── Table.tsx           # Basit tablo
├── Tabs.tsx            # Sekme navigasyonu
├── Toast.tsx           # Bildirim toast
└── BottomGradient.tsx  # Alt gradient efekti
```

### 8.2 Layout Components (5 Adet)

```
src/components/layout/
├── Layout.tsx           # Ana layout wrapper
├── OnboardingLayout.tsx # Onboarding layout
├── Sidebar.tsx          # Yan menü
├── Header.tsx           # Üst menü
└── Breadcrumb.tsx       # Breadcrumb navigasyonu
```

### 8.3 Dashboard Components (7 Adet)

```
src/components/dashboard/
├── AnimatedCounter.tsx  # Animasyonlu sayaç
├── KPICard.tsx          # KPI kartı
├── QuickActions.tsx     # Hızlı eylemler
├── RecentActivities.tsx # Son aktiviteler
├── RevenueChart.tsx     # Gelir grafiği
├── TasksChart.tsx       # Görev grafiği
└── UpcomingTasks.tsx    # Yaklaşan görevler
```

### 8.4 UI Components (3 Adet)

```
src/components/ui/
├── LayoutTextFlip.tsx   # Metin çevirme efekti
├── LightPillar.tsx      # Işık sütunu efekti
└── LinkPreview.tsx      # Link önizleme
```

### 8.5 Widget Components (1 Adet)

```
src/components/widgets/
└── LeadCaptureWidget.tsx  # Lead yakalama formu
```

---

## 9. Güvenlik ve Performans

### 9.1 Client-Side Güvenlik

```typescript
// src/utils/security.ts
initSecurity() {
  // XSS koruması
  // CSRF token yönetimi
  // Input sanitizasyonu
  // Console güvenliği
}
```

### 9.2 Route Koruması

```typescript
// Koruma katmanları
1. RequireAuth      → Giriş kontrolü
2. RequireSector    → Sektör seçim kontrolü
3. RequireAccountType → Hesap tipi kontrolü
4. PublicRoute      → Giriş yapmış kullanıcıyı yönlendir
```

### 9.3 Performans Optimizasyonları

```typescript
// Code Splitting - Lazy Loading
const Dashboard = lazy(() => import('./Dashboard'));

// Suspense ile Loading State
<Suspense fallback={<PageLoader />}>
  <Routes />
</Suspense>

// Performance Mode Ayarı
performanceMode: 'auto' | 'performance' | 'quality'
```

### 9.4 Netlify SPA Routing

```
# public/_redirects
/* /index.html 200
```

---

## 10. Proje Yapısı

### 10.1 Klasör Organizasyonu

```
Demo-Dashboard-Full/
│
├── public/                      # Statik dosyalar
│   ├── _redirects              # Netlify SPA routing
│   └── favicon.ico             # Site ikonu
│
├── src/                         # Kaynak kod
│   │
│   ├── assets/                  # Varlık dosyaları
│   │   ├── images/             # Görseller
│   │   │   ├── cameras/        # Kamera görselleri
│   │   │   ├── common/         # Ortak görseller
│   │   │   ├── displays/       # Ekran görselleri
│   │   │   ├── logos/          # Logolar
│   │   │   ├── products/       # Ürün görselleri
│   │   │   ├── profiles/       # Profil fotoğrafları
│   │   │   └── sectors/        # Sektör görselleri
│   │   ├── lotties-icon/       # Lottie animasyonları
│   │   └── screenshots/        # Ekran görüntüleri
│   │
│   ├── components/              # React bileşenleri
│   │   ├── common/             # Ortak bileşenler (24)
│   │   ├── dashboard/          # Dashboard bileşenleri (7)
│   │   ├── layout/             # Layout bileşenleri (5)
│   │   ├── ui/                 # UI bileşenleri (3)
│   │   └── widgets/            # Widget bileşenleri (1)
│   │
│   ├── data/                    # Mock veri dosyaları
│   │   ├── mockData.ts         # Ana mock veri
│   │   ├── sectors.ts          # Sektör tanımları
│   │   ├── hrData.ts           # HR modül verisi
│   │   ├── crmData.ts          # CRM modül verisi
│   │   ├── beautyData.ts       # Beauty sektör verisi
│   │   ├── gymData.ts          # Gym sektör verisi
│   │   └── ...                 # Diğer veri dosyaları
│   │
│   ├── hooks/                   # Custom React hooks
│   │   └── useDebounce.ts      # Debounce hook
│   │
│   ├── lib/                     # Utility kütüphaneleri
│   │   └── utils.ts            # Tailwind merge utils
│   │
│   ├── pages/                   # Sayfa bileşenleri (160+)
│   │   ├── auth/               # Kimlik doğrulama sayfaları
│   │   │   ├── Login.tsx
│   │   │   └── ModuleSelection.tsx
│   │   ├── onboarding/         # Onboarding sayfaları
│   │   │   ├── SectorSelect.tsx
│   │   │   └── AccountTypeSelect.tsx
│   │   ├── dashboard/          # Dashboard sayfaları
│   │   │   ├── Dashboard.tsx
│   │   │   ├── hr/            # HR modülü (8 sayfa)
│   │   │   ├── accounting/    # Muhasebe modülü (8 sayfa)
│   │   │   ├── crm/           # CRM modülü (8 sayfa)
│   │   │   ├── tasks/         # Görev modülü (6 sayfa)
│   │   │   ├── access-control/ # Erişim kontrolü (8 sayfa)
│   │   │   ├── signage/       # Dijital tabela (5 sayfa)
│   │   │   ├── communication/ # İletişim (4 sayfa)
│   │   │   ├── files/         # Dosyalar (5 sayfa)
│   │   │   ├── reports/       # Raporlar (5 sayfa)
│   │   │   ├── maintenance/   # Bakım (8 sayfa)
│   │   │   ├── qr-codes/      # QR kodlar (8 sayfa)
│   │   │   ├── settings/      # Ayarlar (9 sayfa)
│   │   │   ├── gym/           # Gym sektörü (10 sayfa)
│   │   │   ├── staffing/      # Staffing sektörü (12 sayfa)
│   │   │   ├── realestate/    # Emlak sektörü (10 sayfa)
│   │   │   ├── agency/        # Ajans sektörü (11 sayfa)
│   │   │   ├── events/        # Etkinlik sektörü (11 sayfa)
│   │   │   ├── beauty/        # Güzellik sektörü (12 sayfa)
│   │   │   ├── laundry/       # Çamaşır sektörü (11 sayfa)
│   │   │   └── hardware/      # Hırdavat sektörü (13 sayfa)
│   │   └── errors/             # Hata sayfaları
│   │       ├── NotFound.tsx
│   │       └── ServerError.tsx
│   │
│   ├── store/                   # Zustand state yönetimi
│   │   ├── authStore.ts        # Kimlik doğrulama state
│   │   └── appStore.ts         # Uygulama state
│   │
│   ├── styles/                  # Global stiller
│   │   └── globals.css         # Global CSS
│   │
│   ├── types/                   # TypeScript tipleri
│   │   └── index.ts            # Tip tanımları
│   │
│   ├── utils/                   # Yardımcı fonksiyonlar
│   │   ├── constants.ts        # Sabitler ve route'lar
│   │   ├── helpers.ts          # Yardımcı fonksiyonlar
│   │   ├── branding.ts         # Marka ayarları
│   │   ├── security.ts         # Güvenlik fonksiyonları
│   │   ├── profileImages.ts    # Profil resim yönetimi
│   │   └── productImages.ts    # Ürün resim yönetimi
│   │
│   ├── App.tsx                  # Ana uygulama bileşeni
│   ├── main.tsx                 # Uygulama giriş noktası
│   └── vite-env.d.ts           # Vite tip tanımları
│
├── Configuration Files
│   ├── vite.config.ts          # Vite yapılandırması
│   ├── tailwind.config.js      # Tailwind yapılandırması
│   ├── tsconfig.json           # TypeScript yapılandırması
│   ├── tsconfig.app.json       # App TS yapılandırması
│   ├── tsconfig.node.json      # Node TS yapılandırması
│   ├── postcss.config.js       # PostCSS yapılandırması
│   ├── eslint.config.js        # ESLint yapılandırması
│   ├── package.json            # Proje bağımlılıkları
│   └── index.html              # HTML giriş noktası
│
└── dist/                        # Production build çıktısı
```

### 10.2 Önemli Dosya Lokasyonları

| Amaç | Lokasyon |
|------|----------|
| Ana Giriş | `src/App.tsx`, `src/main.tsx` |
| Kimlik Doğrulama | `src/store/authStore.ts` |
| Uygulama State | `src/store/appStore.ts` |
| Route Tanımları | `src/utils/constants.ts` |
| Sayfa Bileşenleri | `src/pages/` |
| Ortak Bileşenler | `src/components/common/` |
| Mock Veri | `src/data/` |
| Tip Tanımları | `src/types/index.ts` |
| Stil Yapılandırması | `tailwind.config.js` |

---

## Özet

ALLYNC Enterprise Management Platform, modern web teknolojileri kullanılarak geliştirilmiş, çok sektörlü ve modüler bir SaaS demo uygulamasıdır.

**Temel Özellikler:**
- 🏢 8 aktif sektör, 15+ yakında eklenecek sektör
- 📦 12 ortak modül + sektöre özel modüller
- 📄 160+ sayfa bileşeni
- 🧩 35+ yeniden kullanılabilir UI bileşeni
- 🔐 Rol tabanlı erişim kontrolü
- 🎨 Modern ve responsive tasarım
- ⚡ Performans odaklı mimari

Bu döküman, potansiyel müşterilere sistemin kapasitesini ve ölçeklenebilirliğini göstermek için hazırlanmıştır.

---

**ALLYNC** | Enterprise Management Platform
© 2024-2026 Allync. Tüm hakları saklıdır.
https://allyncai.com | https://allync.com.tr
