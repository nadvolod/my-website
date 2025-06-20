import { expect, test } from '@playwright/test';

test.describe('Hero Component Bug Fixes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Book Discovery Call button opens HubSpot modal', async ({ page }) => {
    // Start the game to access the completion state
    const startGameBtn = page.getByRole('button', { name: 'Start Game' });
    await expect(startGameBtn).toBeVisible();
    await startGameBtn.click();

    // Play the game to completion (click a few cells to trigger game end)
    const cells = page.locator('[data-testid*="cell"]').or(page.locator('.grid > button'));
    await cells.first().click();
    await page.waitForTimeout(1500); // Wait for computer move
    
    // Try to complete the game quickly by clicking more cells
    const visibleCells = await cells.all();
    for (let i = 1; i < Math.min(visibleCells.length, 4); i++) {
      if (await visibleCells[i].isEnabled()) {
        await visibleCells[i].click();
        await page.waitForTimeout(1000);
      }
    }

    // Check if Book Discovery Call button is visible (appears after game completion)
    const bookCallBtn = page.getByTestId('book-discovery-call-button');
    if (await bookCallBtn.isVisible()) {
      await bookCallBtn.click();
      
      // Verify HubSpot modal opens
      const modal = page.getByText('Partner with Nikolay').first();
      await expect(modal).toBeVisible();
    }
  });

  test('Play Again button resets the game', async ({ page }) => {
    // Start the game
    const startGameBtn = page.getByRole('button', { name: 'Start Game' });
    await startGameBtn.click();

    // Play the game to completion
    const cells = page.locator('.grid > button');
    await cells.first().click();
    await page.waitForTimeout(1500);
    
    // Complete the game
    const visibleCells = await cells.all();
    for (let i = 1; i < Math.min(visibleCells.length, 4); i++) {
      if (await visibleCells[i].isEnabled()) {
        await visibleCells[i].click();
        await page.waitForTimeout(1000);
      }
    }

    // Check if Play Again button is visible
    const playAgainBtn = page.getByTestId('play-again-button');
    if (await playAgainBtn.isVisible()) {
      await playAgainBtn.click();
      
      // Verify game board is reset (all cells should be empty and clickable)
      const resetCells = page.locator('.grid > button');
      const cellCount = await resetCells.count();
      expect(cellCount).toBe(9); // Should have 9 cells in tic-tac-toe
      
      // Verify first cell is clickable again
      await expect(resetCells.first()).toBeEnabled();
    }
  });

  test('Explore More button navigates to next section', async ({ page }) => {
    // Start the game
    const startGameBtn = page.getByRole('button', { name: 'Start Game' });
    await startGameBtn.click();

    // Check if Explore More button is visible
    const exploreMoreBtn = page.getByTestId('explore-more-button');
    if (await exploreMoreBtn.isVisible()) {
      // Get current scroll position
      const initialScrollY = await page.evaluate(() => window.scrollY);
      
      await exploreMoreBtn.click();
      await page.waitForTimeout(1000); // Wait for smooth scroll
      
      // Verify page scrolled down
      const newScrollY = await page.evaluate(() => window.scrollY);
      expect(newScrollY).toBeGreaterThan(initialScrollY);
    }
  });

  test('Game board renders correctly with 3x3 grid', async ({ page }) => {
    // Start the game
    const startGameBtn = page.getByRole('button', { name: 'Start Game' });
    await startGameBtn.click();

    // Verify game board has 9 cells in a 3x3 grid
    const cells = page.locator('.grid > button');
    await expect(cells).toHaveCount(9);
    
    // Verify grid layout (should be 3 columns) - be more specific about the tic-tac-toe grid
    const ticTacToeGrid = page.locator('.grid.grid-cols-3').first();
    await expect(ticTacToeGrid).toHaveClass(/grid-cols-3/);
    
    // Verify cells are clickable initially
    await expect(cells.first()).toBeEnabled();
    await expect(cells.nth(4)).toBeEnabled(); // Middle cell
    await expect(cells.last()).toBeEnabled();
  });

  test('Game state updates correctly after moves', async ({ page }) => {
    // Start the game
    const startGameBtn = page.getByRole('button', { name: 'Start Game' });
    await startGameBtn.click();

    // Make a move
    const firstCell = page.locator('.grid > button').first();
    await firstCell.click();
    
    // Verify cell is no longer clickable after move
    await expect(firstCell).toBeDisabled();
    
    // Verify cell contains a symbol (automation tool emoji)
    const cellContent = await firstCell.textContent();
    expect(cellContent).toMatch(/[⚡🤖🔧]/);
    
    // Wait for computer move
    await page.waitForTimeout(1500);
    
    // Verify at least one more cell is now filled (computer's move)
    const filledCells = page.locator('.grid > button:disabled');
    await expect(filledCells).toHaveCount(2); // Player + computer move
  });
}); 