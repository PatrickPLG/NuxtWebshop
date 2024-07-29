export function getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      "electronics": 'pi pi-desktop',
      "men's clothing": 'pi pi-user-plus',
      "women's clothing": 'pi pi-user-minus',
      "jewelery": 'pi pi-caret-up',
    };
    return icons[category.toLowerCase()] || 'pi pi-folder';
  }